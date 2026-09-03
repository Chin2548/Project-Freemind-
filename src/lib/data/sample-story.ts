import type { StoryContent } from "@/lib/types";

export const SAMPLE_STORY_CONTENT: StoryContent = {
  id: "default",
  eyebrow: "The Freemind Story",
  headlineLine1: "Some places are built to be seen.",
  headlineLine2: "Others are built to be felt.",
  sections: [
    {
      label: "01 / Philosophy",
      title: "A room built for curiosity, not spectacle.",
      body: "Freemind began with a simple question — what happens when a bar stops trying to impress you, and starts trying to hold your attention instead? Everything here follows from that.",
      image: "/images/photos/bar-luxury-empty.jpg",
      reverse: false,
    },
    {
      label: "02 / Craft",
      title: "Precision, without performance.",
      body: "Every cocktail is built with the same quiet discipline — measured, tasted, adjusted, and never rushed. The craft is in what you don't see: the technique behind the ease.",
      image: "/images/photos/bartender-station.jpg",
      reverse: true,
    },
    {
      label: "03 / Ingredients",
      title: "Familiar, seen from a different angle.",
      body: "We favor ingredients with a point of view — jasmine instead of simple syrup, smoked salt instead of a garnish for garnish's sake. Nothing is on the menu by accident.",
      image: "/images/photos/cocktail-orange-peel.jpg",
      reverse: false,
    },
    {
      label: "04 / Space",
      title: "Dark wood. Warm light. Room to think.",
      body: "The space was designed the way a good evening unfolds — slowly. Low light, natural materials, and just enough distance between tables for a private conversation to stay private.",
      image: "/images/photos/bar-glasses-candle.jpg",
      reverse: true,
    },
    {
      label: "05 / Sound",
      title: "Music that stays out of the way.",
      body: "Our sound is chosen the way a good playlist is built for a long drive — present, but never demanding attention. It shifts with the night, never against it.",
      image: "/images/photos/cocktails-trio-dark.jpg",
      reverse: false,
    },
    {
      label: "06 / Hospitality",
      title: "Attentive, never intrusive.",
      body: "Good hospitality is mostly invisible. Our team is trained to notice — an empty glass, a quiet table that wants to stay quiet — without ever making themselves the evening's subject.",
      image: "/images/photos/cocktail-old-fashioned-light.jpg",
      reverse: true,
    },
  ],
  updatedAt: new Date().toISOString(),
};
