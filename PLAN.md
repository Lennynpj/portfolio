# HumanX — Portfolio / Site Vitrine

> Studio web & mobile. Site portfolio « impressionnant » qui montre toutes nos réalisations.
> Référence esthétique : template « Jack — 3D Creator » (dark, cinématique, Framer Motion).

---

## ✅ Décisions verrouillées

| Sujet | Choix |
|---|---|
| Direction artistique | **Dark cinématique** — fond `#0C0C0C`, effet « wow » maximal |
| Langue | **Bilingue FR / EN** — i18n maison (contexte léger), routes `/fr` `/en` à venir |
| Pièce maîtresse 3D (hero) | **2 têtes 3D** (Lenny + Gabriel), style **minimal iconique « logo Airbnb »**. Fichiers `.glb` fournis plus tard → chargés via React Three Fiber. Placeholder porcelaine en attendant. |
| Logo / marque | Le **« X »** reste le sigle (favicon, wordmark, motif déco) → *Human* (les visages) × X |
| Assets visuels | **Tout sur-mesure** — placeholders élégants d'abord, génération ensuite |

---

## 🧱 Stack

```
Vite + React 18 + TypeScript · Tailwind CSS 3.4
Framer Motion 12 · Lucide React
three + @react-three/fiber@8 + @react-three/drei  → hero 3D (.glb)  [ajouté en Phase 2/3]
i18n maison (contexte React) FR/EN
react-router-dom → routes /fr /en (SEO)  [ajouté plus tard]
Lenis (smooth scroll) · react-helmet-async (SEO)  [polish]
Police Kanit (Google Fonts 300–900) · Déploiement Vercel
```

### Structure
```
src/
├─ components/   FadeIn · Magnet · AnimatedText · ContactButton · LiveProjectButton
│                LanguageSwitcher · HeroHeads (R3F) · ProjectCard · StatBand
├─ sections/     Hero · Marquee · About · Stats · Services · Projects · Testimonials · Contact
├─ data/         projects · services · stats · testimonials   (contenu bilingue {fr,en})
├─ locales/      fr.json · en.json   (strings UI)
├─ lib/          l10n.ts · language.tsx   (contexte + helper t())
├─ index.css · main.tsx · App.tsx
public/models/   lenny.glb · gabriel.glb   ← fournis plus tard
```

---

## 🎨 Design system

- Fond `#0C0C0C`, texte `#D7E2EA`. Titres `.hero-heading` (dégradé `#646973→#BBCCD7`, clip text).
- Kanit black/uppercase, `clamp()` partout. Accent pill `linear-gradient(123deg,#18011F,#B600A8,#7621B0,#BE4C00)`.
- Composants repris de Jack : `FadeIn`, `Magnet`, `AnimatedText`, `ContactButton`, `LiveProjectButton`.

---

## 🦴 Hero 3D — têtes Lenny + Gabriel (.glb)

- **Style** : minimal iconique « logo Airbnb » — formes rondes, lisses, matte clay, traits simplifiés. (Prompts GPT Image fournis séparément.)
- **Intégration** : `<Canvas>` R3F, `useGLTF('/models/lenny.glb' | '/models/gabriel.glb')`, `Environment` drei, auto-rotation lente + parallaxe pointeur.
- **Placeholder actuel** : 2 sphères porcelaine (radial gradient) → le hero est déjà « fini » visuellement.
- **Export .glb** : centré origine, Y-up, PBR, Draco/meshopt, < 3 Mo. Déposer dans `public/models/`.

---

## 📑 Sections (ordre)

1. **Hero** — nav + switch FR/EN · titre `HUMANX` · 2 têtes 3D · tagline · « Démarrer un projet »
2. **Marquee** — previews projets qui défilent au scroll
3. **About** — « L'agence » + texte révélé au scroll + 4 objets 3D déco
4. **Stats** — 50+ · 98% · 24h · NPS 72 · 4.9/5 (compteurs animés)
5. **Services** — 6 services 01–06
6. **Projects** — 5 cartes sticky-stacking (projets réels + résultats)
7. **Testimonials** — retours fondateurs
8. **Contact** — CTA + formulaire / Calendly

### Projets
| # | Projet | Catégorie | Résultat |
|---|---|---|---|
| 01 | MIA CV | IA & Recrutement | +3,4× passage ATS |
| 02 | TipsYou | Fintech & Social | UI 60 fps |
| 03 | HumanONG | SaaS B2B | +38 % rétention |
| 04 | Get5Stars | SaaS B2B | Boost 4,9★ |
| 05 | Steven Coaching | Coaching | Lighthouse 98 |

### Services
`01 Dév Web · 02 Apps Mobiles · 03 Plateformes SaaS · 04 IA · 05 E-commerce & Fintech · 06 Conseil`

---

## 🛠️ Phases

- [x] **Phase 0** — Scaffold Vite + Tailwind + Kanit + i18n + structure + Hero (placeholder têtes)
- [x] **Phase 1** — Composants restants (Magnet, AnimatedText, ProjectCard, CountUp, MediaPlaceholder)
- [x] **Phase 2** — Mockups **SVG** sur-mesure (5 projets distincts + tuiles marquee) + hero **3D R3F** (placeholder têtes porcelaine)
- [x] **Phase 3** — Sections (Marquee → About → Stats → Services → Projects → Testimonials → Contact)
- [x] **Phase 4** — Lenis smooth scroll + routes `/fr` `/en` + hero 3D + titre qui tient à toute largeur
- [ ] **Phase 5** — Perf, SEO, déploiement Vercel
- [ ] **Plus tard** — Intégration des vrais `lenny.glb` / `gabriel.glb`
