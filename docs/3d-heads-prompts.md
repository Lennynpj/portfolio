# Prompts — Têtes 3D (Lenny & Gabriel)

Style : minimal iconique « logo Airbnb » — formes rondes, matte clay, traits simplifiés.
Objectif : 2 PNG transparents → hero. Optionnel : conversion en `.glb` (image → 3D).

> ⚠️ ElevenLabs = audio/voix. Pour générer des images il faut un **générateur d'images**
> (GPT Image, Midjourney, Higgsfield…). Attacher la photo de référence améliore la ressemblance.

---

## Bloc de style (à coller dans chaque prompt)

```
STYLE: a minimalist 3D character head, clean and iconic like a premium brand 3D icon
(Airbnb-level simplicity) — soft rounded geometry, smooth matte clay surface, simplified
and reduced facial features (no skin pores, no wrinkles, no realistic texture), friendly
and approachable, gentle soft studio lighting with soft shadows and a subtle rim light,
front-facing with a very slight 3/4 turn, head and upper neck only (bust), perfectly
centered. High-end minimal 3D render, soft global illumination, ultra-clean crisp edges,
8k. No text, no logo, no watermark, no background props. Isolated on a fully transparent
background (alpha).
```

---

## Lenny  (réf. : photo portrait + à gauche sur la photo de groupe)

```
A minimalist 3D character head icon of a young man in his early twenties, warm
light-brown / tan skin. Keep the likeness but simplified and stylized (not realistic):
- Hair: voluminous dark-brown curly hair, soft rounded curls, medium volume on top
- Glasses: clear transparent acetate frames, rounded-square shape
- Facial hair: light thin mustache and a small soft goatee
- Expression: warm, wide, friendly smile

[COLLER LE BLOC DE STYLE ICI]

PALETTE: keep a natural but slightly stylized skin tone, smooth matte finish; add a soft
rim-light gradient from magenta #B600A8 to warm orange #BE4C00 along the edges so it pops
on a near-black #0C0C0C background.
FORMAT: square 1:1, transparent PNG.
```

## Gabriel  (réf. : 3e en partant de la droite, polo foncé, sur la photo de groupe)

```
A minimalist 3D character head icon of a young man in his early twenties, deep dark-brown
skin. Keep the likeness but simplified and stylized (not realistic):
- Hair: very short cropped black hair, clean low fade, neat hairline
- Glasses: none
- Facial hair: clean-shaven
- Expression: calm, confident, friendly smile

[COLLER LE BLOC DE STYLE ICI]

PALETTE: keep a natural but slightly stylized skin tone, smooth matte finish; add a soft
rim-light gradient from magenta #B600A8 to warm orange #BE4C00 along the edges so it pops
on a near-black #0C0C0C background.
FORMAT: square 1:1, transparent PNG.
```

---

## Variante « plus logo » (monochrome)

```
MONOCHROME VARIANT: replace the skin tone with a single matte material — soft porcelain
off-white (or brushed chrome) — identity carried only by the hairstyle and glasses
silhouette. More abstract, more logo-like, perfectly cohesive as a pair.
```

## Réglages & cohérence

- **Fond transparent** obligatoire · **1:1** · **front 3/4** (idéal pour conversion 3D).
- Générer les **deux dans la même session / même seed** → paire assortie.
- **Ressemblance** : joindre la photo de réf (Lenny = le portrait ; Gabriel = recadrer son visage sur la photo de groupe) et garder ce texte comme direction de style.
- Ensuite : soit **PNG + effet Magnet** (le plus simple, comme Jack), soit **image → 3D** → `public/models/lenny.glb` & `gabriel.glb`.
