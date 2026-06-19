# Prompts — Vidéo de fond du hero (derrière HUMANX + les têtes)

Objectif : loop abstrait **très sombre**, centre calme (le titre s'y pose), mouvement/couleur
vers les bords, **boucle sans coupure**. Couleurs de marque : magenta #B600A8, violet #7621B0,
orange #BE4C00, fond #0C0C0C.

> ⚠️ ElevenLabs = audio. Pour la vidéo → générateur vidéo (Higgsfield / Runway / Kling / Sora…).

Calque final dans le hero : `vidéo → voile sombre rgba(12,12,12,.5) + vignette → HUMANX → têtes 3D`.

---

## 🌌 Aurora dégradé (recommandé)
```
Abstract dark aurora background, near-black #0C0C0C base. Liquid gradient light slowly flowing
and morphing — deep magenta (#B600A8), violet (#7621B0) and burnt orange (#BE4C00) nebula drifting
through black space. Soft volumetric haze, gentle undulating waves, very dark and moody; the CENTER
stays near-black and calm while glow pools toward the edges and corners. Slow, hypnotic, seamless
loop, no hard cuts. No text, no logos, no people, no objects. Cinematic, premium, subtle film grain,
soft bokeh. 16:9, high resolution, 24fps.
```

## 🔗 Réseau de particules
```
Minimal dark particle-network background, near-black #0C0C0C base. Tiny glowing dots slowly drifting
in 3D depth with faint connecting lines forming and dissolving like a soft constellation; subtle
parallax. Sparks of deep magenta (#B600A8) and violet (#7621B0), mostly black, very sparse and calm;
the CENTER stays dark so text remains readable. Slow, elegant tech atmosphere, seamless loop, no hard
cuts. No text, no logos, no people. Cinematic, premium, subtle grain. 16:9, high resolution, 24fps.
```

## 🪨 Volumétrique / fumée
```
Dark volumetric smoke and light background, pitch-black #0C0C0C void. Faint magenta (#B600A8) and
burnt orange (#BE4C00) light beams cutting slowly through dark fog, abstract obsidian shapes barely
catching colored rim light, cinematic god-rays, deep contrast; the CENTER stays dark and calm.
Hypnotic slow drift, seamless loop, no hard cuts. No text, no logos, no people, no objects. Premium,
moody, subtle grain. 16:9, high resolution, 24fps.
```

---

## Réglages
- Durée **6–10 s**, **16:9**, demander explicitement **"seamless loop"**, résolution max.
- Trop clair ? Ajouter : `darker, lower exposure, more black, motion only near the edges`.
- Générer **2–3 variations**, garder la plus sombre.

## Intégration (quand le fichier est prêt)
1. Déposer le fichier dans `public/` (ex. `public/hero-bg.mp4` + `public/hero-bg.webm`).
2. Je câble un `<video autoplay muted loop playsinline poster>` en fond du hero,
   + voile sombre + vignette + `prefers-reduced-motion` (fallback image fixe) + version mobile allégée.
3. Les têtes 3D (canvas transparent) restent au-dessus → effet de profondeur.
