export type MenuCategory =
  | "signatures"
  | "classics"
  | "spirits"
  | "wine"
  | "beer"
  | "non-alcoholic";

export interface MenuItem {
  id: string;
  name: string;
  category: MenuCategory;
  price: number;
  currency: string;
  imageUrl: string;
  ingredients: string[];
  description: string;
  story: string;
  flavorProfile: string[];
  recommendedOccasion: string;
  featured: boolean;
  available: boolean;
  createdAt: string;
  updatedAt: string;
}

export type EventCategory =
  | "live-music"
  | "dj-night"
  | "guest-bartender"
  | "tasting"
  | "special-night"
  | "collaboration";

export interface BarEvent {
  id: string;
  title: string;
  date: string; // ISO date, YYYY-MM-DD
  startTime: string; // HH:MM
  endTime: string; // HH:MM
  category: EventCategory;
  description: string;
  imageUrl: string;
  location: string;
  bookingUrl: string;
  featured: boolean;
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface OpeningHoursEntry {
  days: string;
  hours: string;
}

export interface SiteSettings {
  id: string;
  barName: string;
  tagline: string;
  phone: string;
  email: string;
  address: string;
  instagramUrl: string;
  facebookUrl: string;
  tiktokUrl: string;
  googleMapsUrl: string;
  reservationUrl: string;
  openingHours: OpeningHoursEntry[];
  findUsImageUrl: string;
  updatedAt: string;
}

export interface IngredientStep {
  label: string;
  note: string;
  image: string;
}

export interface HomepageContent {
  id: string;
  heroLabel: string;
  heroHeadline: string;
  heroTagline: string;
  heroSubtext: string;
  heroImageUrl: string;
  spaceLabel: string;
  spaceHeadline: string;
  spaceBody: string;
  spaceImageUrl: string;
  philosophyHeadline: string;
  philosophySubtext: string;
  craftLabel: string;
  craftHeadline: string;
  craftBody: string;
  craftImageUrl: string;
  ingredientJourney: IngredientStep[];
  menuSectionLabel: string;
  menuSectionHeadline: string;
  eventsSectionLabel: string;
  eventsSectionHeadline: string;
  nightHeadline: string;
  nightImageUrl: string;
  findusLabel: string;
  findusHeadline: string;
  reserveHeadline: string;
  reserveImageUrl: string;
  updatedAt: string;
}

export interface StorySectionContent {
  label: string;
  title: string;
  body: string;
  image: string;
  reverse: boolean;
}

export interface StoryContent {
  id: string;
  eyebrow: string;
  headlineLine1: string;
  headlineLine2: string;
  sections: StorySectionContent[];
  updatedAt: string;
}

export const MENU_CATEGORY_LABELS: Record<MenuCategory, string> = {
  signatures: "Signatures",
  classics: "Classics",
  spirits: "Spirits",
  wine: "Wine",
  beer: "Beer",
  "non-alcoholic": "Non-Alcoholic",
};

export const EVENT_CATEGORY_LABELS: Record<EventCategory, string> = {
  "live-music": "Live Music",
  "dj-night": "DJ Night",
  "guest-bartender": "Guest Bartender",
  tasting: "Tasting",
  "special-night": "Special Night",
  collaboration: "Collaboration",
};
