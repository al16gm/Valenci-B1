# CIEACOVA B1 — Pla 28 Dies

Aplicació web d'aprenentatge intensiu en 28 dies per a preparar la prova oficial **CIEACOVA B1** de valencià.

## Funcionalitats principals

- **Pla de 28 dies (Setmanes 1–4)**: Píndoles teòriques diàries enfocades a eliminar calcs freqüents (preposició *a* davant CD, *tindre que*, *hi han*, caiguda de preposicions davant *que*, pronoms febles *en* / *hi*, lèxic i simulacres orals).
- **Formulari d'exercicis per dia**: Totes les preguntes del dia s'avaluen de colp amb **Comprovar Respostes**, marcant encerts en verd, errades en roig i la puntuació obtinguda.
- **Pràctica Oral (IA)**: Prompt diari amb botó **Copiar Prompt per a IA** i les **Instruccions de Sistema** oficials d'examinador CIEACOVA B1 llestes per a copiar a Gemini o ChatGPT.
- **Mode Repàs**: Genera una selecció aleatòria de fins a 5 exercicis d'entre els dies ja superats per a reforçar la memòria a llarg termini.
- **Persistència local (`localStorage`)**: Recorda l'últim dia obert, marca amb `✓` els dies superats, calcula la ratxa i mostra una barra de progrés animada superior.

## Desenvolupament local

```bash
npm install
npm run dev
```

Per a generar la versió estàtica de producció:

```bash
npm run lint
npm run build
```

## Publicació en GitHub Pages

Aquest repositori inclou un flux automàtic de GitHub Actions (`.github/workflows/deploy.yml`) i configuració amb rutes relatives (`base: './'` en `vite.config.ts`) compatible amb qualsevol subruta (`https://usuari.github.io/nom-del-repositori/`).

1. Puja el projecte a un repositori de GitHub (branca `main` o `master`).
2. Ves a **Settings → Pages** al teu repositori.
3. En **Build and deployment → Source**, tria **GitHub Actions**.
4. Cada `push` compilarà i publicarà automàticament la carpeta `dist/`.
