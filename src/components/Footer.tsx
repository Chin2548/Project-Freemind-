import Link from "next/link";
import type { SiteSettings } from "@/lib/types";

const NAV_LINKS = [
  { href: "/menu", label: "Menu" },
  { href: "/events", label: "Events" },
  { href: "/story", label: "Story" },
  { href: "/find-us", label: "Find Us" },
];

export function Footer({ settings }: { settings: SiteSettings }) {
  const socials = [
    { href: settings.instagramUrl, label: "Instagram" },
    { href: settings.facebookUrl, label: "Facebook" },
    { href: settings.tiktokUrl, label: "TikTok" },
  ].filter((s) => s.href);

  return (
    <footer className="border-t border-walnut/60 bg-chocolate">
      <div className="mx-auto max-w-[1600px] px-6 py-16 md:px-10 md:py-24">
        <div className="grid grid-cols-1 gap-14 md:grid-cols-4 md:gap-8">
          <div>
            <p className="font-serif text-2xl tracking-[0.1em] text-ivory">
              FREEMIND <span className="text-brass">BKK</span>
            </p>
            <p className="mt-3 font-sans text-xs uppercase tracking-[0.24em] text-taupe">
              Free your mind.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <p className="font-sans text-[10px] uppercase tracking-[0.28em] text-brass">
              Explore
            </p>
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-sans text-sm text-taupe transition-colors hover:text-ivory"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex flex-col gap-3">
            <p className="font-sans text-[10px] uppercase tracking-[0.28em] text-brass">
              Connect
            </p>
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="font-sans text-sm text-taupe transition-colors hover:text-ivory"
              >
                {s.label}
              </a>
            ))}
            <a
              href={`tel:${settings.phone.replace(/\s/g, "")}`}
              className="font-sans text-sm text-taupe transition-colors hover:text-ivory"
            >
              {settings.phone}
            </a>
            <a
              href={`mailto:${settings.email}`}
              className="font-sans text-sm text-taupe transition-colors hover:text-ivory"
            >
              {settings.email}
            </a>
          </div>

          <div className="flex flex-col gap-3">
            <p className="font-sans text-[10px] uppercase tracking-[0.28em] text-brass">
              Opening Hours
            </p>
            {settings.openingHours.map((entry) => (
              <div key={entry.days} className="font-sans text-sm text-taupe">
                <span>{entry.days}</span>
                <span className="ml-2 text-cream">{entry.hours}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 flex flex-col-reverse items-start justify-between gap-4 border-t border-walnut/40 pt-8 md:flex-row md:items-center">
          <p className="font-sans text-[11px] uppercase tracking-[0.2em] text-taupe/70">
            © {new Date().getFullYear()} Freemind BKK. All rights reserved.
          </p>
          <p className="font-serif text-sm italic text-taupe/70">
            Free your mind.
          </p>
        </div>
      </div>
    </footer>
  );
}
