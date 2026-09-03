import { getFeaturedMenuItems } from "@/lib/data/menu";
import { getUpcomingEvents } from "@/lib/data/events";
import { getSiteSettings } from "@/lib/data/settings";
import { getHomepageContent } from "@/lib/data/homepage";
import { EntryScreen } from "@/components/EntryScreen";
import { Hero } from "@/components/home/Hero";
import { TheSpace } from "@/components/home/TheSpace";
import { Philosophy } from "@/components/home/Philosophy";
import { TheCraft } from "@/components/home/TheCraft";
import { IngredientJourney } from "@/components/home/IngredientJourney";
import { SignatureCocktails } from "@/components/home/SignatureCocktails";
import { WhatsHappening } from "@/components/home/WhatsHappening";
import { TheNight } from "@/components/home/TheNight";
import { FindUsPreview } from "@/components/home/FindUsPreview";
import { ReservationCTA } from "@/components/home/ReservationCTA";

export default async function HomePage() {
  const [settings, featured, events, content] = await Promise.all([
    getSiteSettings(),
    getFeaturedMenuItems(),
    getUpcomingEvents(3),
    getHomepageContent(),
  ]);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BarOrPub",
    name: settings.barName,
    description:
      "A sophisticated cocktail bar in Bangkok for curious minds, crafted drinks, and intimate nights.",
    address: {
      "@type": "PostalAddress",
      streetAddress: settings.address,
      addressLocality: "Bangkok",
      addressCountry: "TH",
    },
    telephone: settings.phone,
    email: settings.email,
    servesCuisine: "Cocktails",
    priceRange: "$$$",
    sameAs: [settings.instagramUrl, settings.facebookUrl, settings.tiktokUrl].filter(Boolean),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <EntryScreen />
      <Hero settings={settings} content={content} />
      <TheSpace content={content} />
      <Philosophy content={content} />
      <TheCraft content={content} />
      <IngredientJourney steps={content.ingredientJourney} />
      <SignatureCocktails
        items={featured}
        label={content.menuSectionLabel}
        headline={content.menuSectionHeadline}
      />
      <WhatsHappening
        events={events}
        label={content.eventsSectionLabel}
        headline={content.eventsSectionHeadline}
      />
      <TheNight content={content} />
      <FindUsPreview settings={settings} content={content} />
      <ReservationCTA settings={settings} content={content} />
    </>
  );
}
