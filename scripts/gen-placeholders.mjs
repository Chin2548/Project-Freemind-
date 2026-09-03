import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const OUT_DIR = join(process.cwd(), "public", "images");
mkdirSync(OUT_DIR, { recursive: true });

const PALETTE = {
  obsidian: "#120D0A",
  chocolate: "#241712",
  espresso: "#34231B",
  walnut: "#50382B",
  cognac: "#765640",
  taupe: "#A58F7A",
  oxblood: "#3A1715",
  brass: "#B4976A",
};

function seededRandom(seed) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

function grain(id, opacity) {
  return `
  <filter id="grain-${id}">
    <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" result="noise"/>
    <feColorMatrix in="noise" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.9 0"/>
    <feComponentTransfer><feFuncA type="linear" slope="${opacity}"/></feComponentTransfer>
    <feComposite operator="over" in2="SourceGraphic"/>
  </filter>`;
}

function makeScene({ id, w, h, seed, cx, cy, glowColor, glowR, vignette = 0.75, streaks = 0, orbs = 0 }) {
  const rand = seededRandom(seed);
  let extras = "";

  for (let i = 0; i < streaks; i++) {
    const x = rand() * w;
    const y0 = rand() * h * 0.3;
    const len = h * (0.4 + rand() * 0.5);
    const width = 1 + rand() * (w * 0.015);
    const opacity = 0.03 + rand() * 0.05;
    extras += `<rect x="${x}" y="${y0}" width="${width}" height="${len}" fill="${PALETTE.brass}" opacity="${opacity}" />`;
  }

  for (let i = 0; i < orbs; i++) {
    const x = rand() * w;
    const y = h * 0.4 + rand() * h * 0.55;
    const r = w * (0.01 + rand() * 0.02);
    const opacity = 0.08 + rand() * 0.14;
    extras += `<circle cx="${x}" cy="${y}" r="${r}" fill="${PALETTE.brass}" opacity="${opacity}" />`;
  }

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
  <defs>
    <radialGradient id="glow-${id}" cx="${cx}" cy="${cy}" r="${glowR}" gradientUnits="objectBoundingBox">
      <stop offset="0%" stop-color="${glowColor}" stop-opacity="0.55"/>
      <stop offset="45%" stop-color="${glowColor}" stop-opacity="0.18"/>
      <stop offset="100%" stop-color="${glowColor}" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="vig-${id}" cx="0.5" cy="0.55" r="0.85" gradientUnits="objectBoundingBox">
      <stop offset="55%" stop-color="${PALETTE.obsidian}" stop-opacity="0"/>
      <stop offset="100%" stop-color="${PALETTE.obsidian}" stop-opacity="${vignette}"/>
    </radialGradient>
    <linearGradient id="base-${id}" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="${PALETTE.chocolate}"/>
      <stop offset="100%" stop-color="${PALETTE.obsidian}"/>
    </linearGradient>
    ${grain(id, 0.05)}
  </defs>
  <rect width="${w}" height="${h}" fill="url(#base-${id})"/>
  <rect width="${w}" height="${h}" fill="url(#glow-${id})"/>
  ${extras}
  <rect width="${w}" height="${h}" fill="url(#vig-${id})"/>
  <rect width="${w}" height="${h}" filter="url(#grain-${id})" opacity="0.5"/>
</svg>`;

  writeFileSync(join(OUT_DIR, `${id}.svg`), svg, "utf8");
  console.log(`wrote ${id}.svg`);
}

const scenes = [
  { id: "hero-main", w: 1920, h: 1080, seed: 1, cx: 0.65, cy: 0.35, glowColor: PALETTE.cognac, glowR: 0.9, streaks: 6, orbs: 10 },
  { id: "the-space", w: 1600, h: 2000, seed: 2, cx: 0.3, cy: 0.25, glowColor: PALETTE.brass, glowR: 0.85, streaks: 8, orbs: 6 },
  { id: "the-craft", w: 1600, h: 2000, seed: 3, cx: 0.7, cy: 0.4, glowColor: PALETTE.cognac, glowR: 0.75, streaks: 3, orbs: 14 },
  { id: "ingredient-gin", w: 1200, h: 1500, seed: 4, cx: 0.5, cy: 0.35, glowColor: PALETTE.taupe, glowR: 0.7, streaks: 2, orbs: 8 },
  { id: "ingredient-jasmine", w: 1200, h: 1500, seed: 5, cx: 0.45, cy: 0.3, glowColor: PALETTE.brass, glowR: 0.7, streaks: 2, orbs: 10 },
  { id: "ingredient-bitter-orange", w: 1200, h: 1500, seed: 6, cx: 0.55, cy: 0.35, glowColor: PALETTE.oxblood, glowR: 0.8, streaks: 2, orbs: 8 },
  { id: "ingredient-vermouth", w: 1200, h: 1500, seed: 7, cx: 0.4, cy: 0.4, glowColor: PALETTE.cognac, glowR: 0.75, streaks: 3, orbs: 9 },
  { id: "ingredient-final", w: 1200, h: 1500, seed: 8, cx: 0.5, cy: 0.32, glowColor: PALETTE.brass, glowR: 0.95, streaks: 4, orbs: 16 },
  { id: "cocktail-midnight-bloom", w: 1200, h: 1500, seed: 9, cx: 0.5, cy: 0.35, glowColor: PALETTE.oxblood, glowR: 0.85, streaks: 2, orbs: 12 },
  { id: "cocktail-forest-after-rain", w: 1200, h: 1500, seed: 10, cx: 0.45, cy: 0.35, glowColor: PALETTE.taupe, glowR: 0.75, streaks: 2, orbs: 10 },
  { id: "cocktail-last-light", w: 1200, h: 1500, seed: 11, cx: 0.55, cy: 0.3, glowColor: PALETTE.cognac, glowR: 0.9, streaks: 3, orbs: 11 },
  { id: "cocktail-generic-1", w: 1200, h: 1500, seed: 12, cx: 0.5, cy: 0.35, glowColor: PALETTE.brass, glowR: 0.8, streaks: 2, orbs: 9 },
  { id: "cocktail-generic-2", w: 1200, h: 1500, seed: 13, cx: 0.4, cy: 0.4, glowColor: PALETTE.walnut, glowR: 0.8, streaks: 2, orbs: 8 },
  { id: "event-guest-bartender", w: 1600, h: 1000, seed: 14, cx: 0.6, cy: 0.3, glowColor: PALETTE.cognac, glowR: 0.9, streaks: 5, orbs: 12 },
  { id: "event-live-music", w: 1600, h: 1000, seed: 15, cx: 0.35, cy: 0.35, glowColor: PALETTE.oxblood, glowR: 0.85, streaks: 4, orbs: 14 },
  { id: "event-dj-night", w: 1600, h: 1000, seed: 16, cx: 0.55, cy: 0.4, glowColor: PALETTE.brass, glowR: 0.9, streaks: 6, orbs: 16 },
  { id: "event-tasting", w: 1600, h: 1000, seed: 17, cx: 0.45, cy: 0.35, glowColor: PALETTE.taupe, glowR: 0.75, streaks: 3, orbs: 9 },
  { id: "story-philosophy", w: 1600, h: 2000, seed: 18, cx: 0.5, cy: 0.3, glowColor: PALETTE.brass, glowR: 0.85, streaks: 5, orbs: 10 },
  { id: "story-craft", w: 1600, h: 2000, seed: 19, cx: 0.6, cy: 0.35, glowColor: PALETTE.cognac, glowR: 0.8, streaks: 3, orbs: 12 },
  { id: "story-ingredients", w: 1600, h: 2000, seed: 20, cx: 0.4, cy: 0.4, glowColor: PALETTE.oxblood, glowR: 0.75, streaks: 2, orbs: 8 },
  { id: "story-space", w: 1600, h: 2000, seed: 21, cx: 0.5, cy: 0.3, glowColor: PALETTE.taupe, glowR: 0.85, streaks: 6, orbs: 9 },
  { id: "story-music", w: 1600, h: 2000, seed: 22, cx: 0.55, cy: 0.4, glowColor: PALETTE.brass, glowR: 0.8, streaks: 4, orbs: 13 },
  { id: "story-hospitality", w: 1600, h: 2000, seed: 23, cx: 0.45, cy: 0.35, glowColor: PALETTE.cognac, glowR: 0.85, streaks: 3, orbs: 10 },
  { id: "the-night", w: 1920, h: 1200, seed: 24, cx: 0.6, cy: 0.3, glowColor: PALETTE.oxblood, glowR: 0.95, streaks: 8, orbs: 20 },
  { id: "find-us", w: 1600, h: 1400, seed: 25, cx: 0.5, cy: 0.35, glowColor: PALETTE.brass, glowR: 0.8, streaks: 4, orbs: 10 },
  { id: "reserve-cta", w: 1920, h: 1000, seed: 26, cx: 0.5, cy: 0.35, glowColor: PALETTE.cognac, glowR: 0.95, streaks: 6, orbs: 16 },
];

for (const s of scenes) makeScene(s);
console.log(`Generated ${scenes.length} placeholder scenes.`);
