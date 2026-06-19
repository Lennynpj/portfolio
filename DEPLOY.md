# Déploiement — `portfolio.humanx-group.com`

Site statique (Vite/React) servi par nginx dans un conteneur Docker.
Le build se fait **dans l'image** (`docker build`), donc le VPS n'a besoin que de Docker.

---

## TL;DR

```bash
git clone https://github.com/Lennynpj/portfolio.git
cd portfolio
docker compose up -d --build         # build + lance le site sur le port 8088
curl -I http://localhost:8088        # doit répondre 200 OK
```

Puis route `portfolio.humanx-group.com` → `:8088` via ton reverse proxy (§4) et
ajoute un enregistrement DNS (§1).

---

## 1. DNS

Chez le gestionnaire DNS de `humanx-group.com`, ajoute :

| Type | Nom         | Valeur            |
|------|-------------|-------------------|
| A    | `portfolio` | `<IP_DU_VPS>`     |
| AAAA | `portfolio` | `<IPv6_DU_VPS>` (si tu as de l'IPv6) |

Vérifie la propagation :
```bash
dig +short portfolio.humanx-group.com
```

---

## 2. Récupérer et lancer sur le VPS

```bash
git clone https://github.com/Lennynpj/portfolio.git
cd portfolio
docker compose up -d --build
```

- `--build` relance `npm ci && npm run build` dans l'image.
- Le conteneur `humanx-portfolio` écoute en interne sur le port 80, exposé sur **8088** du VPS.

Test local sur le VPS :
```bash
curl -I http://localhost:8088   # HTTP/1.1 200 OK
```

---

## 3. Identifier ton reverse proxy

Tes autres apps servent déjà des sous-domaines en HTTPS → quelque chose occupe déjà
les ports 80/443. **Ne lance pas un 2e proxy dessus**, réutilise l'existant.

```bash
docker ps --format 'table {{.Names}}\t{{.Image}}\t{{.Ports}}'
sudo ss -tlnp '( sport = :80 or sport = :443 )'
```

Repère l'image/port :
- `traefik` → **§4-B**
- `jc21/nginx-proxy-manager` (interface sur :81) → **§4-A**
- `caddy` (conteneur) ou `caddy` sur l'hôte → **§4-C**
- `nginx` directement sur l'hôte (hors Docker) → **§4-D**

---

## 4. Router le sous-domaine + SSL

### A. Nginx Proxy Manager (interface web)
1. **Hosts → Proxy Hosts → Add Proxy Host**
   - Domain Names : `portfolio.humanx-group.com`
   - Forward Hostname/IP : l'IP du VPS (ou `humanx-portfolio` si NPM est sur le même réseau Docker, voir §5)
   - Forward Port : `8088` (ou `80` si réseau Docker partagé)
   - Coche **Block Common Exploits** + **Websockets** (optionnel)
2. Onglet **SSL** → *Request a new SSL Certificate* + **Force SSL** + *I Agree…* → Save.

### B. Traefik (labels)
1. Dans `docker-compose.yml` : décommente le bloc `networks` (service + bas de fichier),
   mets le **nom de réseau Traefik** à la place de `proxy`, retire le mapping `ports`.
2. Décommente/adapte les `labels` (entrypoint `websecure`, `certresolver` = le tien).
3. `docker compose up -d`. Traefik détecte le conteneur et émet le certificat.

### C. Caddy  ← **setup actuel de ce VPS**
Caddy tourne en conteneur (`eventpics-caddy`) sur le réseau `eventpics-net`, Caddyfile
monté depuis `/home/debian/eventpics/deploy/Caddyfile`. Le `docker-compose.yml` attache
déjà `humanx-portfolio` à `eventpics-net`, donc Caddy le joint par son nom.

Ajoute ce bloc à `/home/debian/eventpics/deploy/Caddyfile` :
```caddy
# ─── HumanX Portfolio ──────────────────────────────────────────────────
portfolio.humanx-group.com {
    encode zstd gzip
    header {
        Strict-Transport-Security "max-age=63072000; includeSubDomains; preload"
        X-Content-Type-Options nosniff
        X-Frame-Options DENY
        Referrer-Policy strict-origin-when-cross-origin
        -Server
        -X-Powered-By
    }
    reverse_proxy humanx-portfolio:80 {
        header_up Host {host}
    }
}
```
Puis valide + recharge sans coupure (Caddy émet le certificat tout seul) :
```bash
docker exec eventpics-caddy caddy validate --config /etc/caddy/Caddyfile
docker exec eventpics-caddy caddy reload  --config /etc/caddy/Caddyfile
```

### D. nginx sur l'hôte + certbot
`/etc/nginx/sites-available/portfolio.humanx-group.com` :
```nginx
server {
    listen 80;
    server_name portfolio.humanx-group.com;
    location / {
        proxy_pass http://127.0.0.1:8088;
        proxy_set_header Host $host;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```
```bash
sudo ln -s /etc/nginx/sites-available/portfolio.humanx-group.com /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx
sudo certbot --nginx -d portfolio.humanx-group.com
```

---

## 5. Note réseau (proxy en Docker)

Pour qu'un proxy en conteneur (Traefik / NPM) joigne le site par son **nom** plutôt
que par un port public, mets-les sur un réseau commun. Dans `docker-compose.yml` :

```yaml
services:
  portfolio:
    # ... retire le bloc "ports:"
    networks:
      - proxy
networks:
  proxy:
    external: true     # nom exact du réseau de ton proxy (docker network ls)
```
Le proxy cible alors `http://humanx-portfolio:80`.

---

## 6. Mettre à jour le site

```bash
cd portfolio
git pull
docker compose up -d --build
```

---

## 7. Dépannage

- `docker compose logs -f portfolio` — logs nginx du conteneur.
- 404 en rechargeant `/fr` ou `/en` → le fallback SPA est déjà géré (`try_files … /index.html`).
- Port 8088 déjà pris → change `"8088:80"` dans `docker-compose.yml`.
- Certificat qui n'émet pas → vérifie que le DNS pointe bien (§1) **avant** de demander le certificat.
