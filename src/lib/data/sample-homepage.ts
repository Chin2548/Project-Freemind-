import type { HomepageContent } from "@/lib/types";

export const SAMPLE_HOMEPAGE_CONTENT: HomepageContent = {
  id: "default",
  heroLabel: "Bangkok, After Dark",
  heroHeadline: "Freemind BKK",
  heroTagline: "Free your mind.",
  heroSubtext:
    "A place for curious minds, slow evenings, and stories worth remembering.",
  heroImageUrl: "/images/photos/bar-luxury-empty.jpg",
  spaceLabel: "01 / The Space",
  spaceHeadline: "The city gets quieter here.",
  spaceBody:
    "Behind the noise of Bangkok, there is a place designed to slow things down.",
  spaceImageUrl: "/images/photos/bar-glasses-candle.jpg",
  philosophyHeadline: "Leave\nthe ordinary\nbehind.",
  philosophySubtext:
    "Freemind is a place to pause, explore, and experience the night differently.",
  craftLabel: "02 / The Craft",
  craftHeadline: "Every detail has a purpose.",
  craftBody:
    "A single ice cube, cut and cooled with intention. A peel, expressed at the right distance. Nothing arrives at your table by accident.",
  craftImageUrl: "/images/photos/bartender-station.jpg",
  ingredientJourney: [
    { label: "Gin", note: "The botanical base.", image: "/images/photos/bartender-station.jpg" },
    { label: "Jasmine", note: "A quiet floral note.", image: "/images/photos/bar-glasses-candle.jpg" },
    {
      label: "Bitter Orange",
      note: "Brightness, held back.",
      image: "/images/photos/cocktail-orange-peel.jpg",
    },
    {
      label: "Vermouth",
      note: "Depth, unhurried.",
      image: "/images/photos/cocktail-old-fashioned-light.jpg",
    },
    {
      label: "Midnight Bloom",
      note: "The result — floral, dry, and quietly complex.",
      image: "/images/photos/cocktails-trio-dark.jpg",
    },
  ],
  menuSectionLabel: "03 / The Menu",
  menuSectionHeadline: "Drinks for curious minds.",
  eventsSectionLabel: "04 / What's Happening",
  eventsSectionHeadline: "After dark, on schedule.",
  nightHeadline: "Come for the drinks.\nStay for the moment.",
  nightImageUrl: "/images/photos/cocktails-trio-dark.jpg",
  findusLabel: "05 / Find Us",
  findusHeadline: "Find your way to Freemind.",
  reserveHeadline: "Your table awaits.",
  reserveImageUrl: "/images/photos/cocktail-orange-peel.jpg",
  updatedAt: new Date().toISOString(),
};
