import { getSiteSettings } from "@/lib/data/settings";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CustomCursor } from "@/components/CustomCursor";
import { LiveTime } from "@/components/LiveTime";
import { SoundToggle } from "@/components/SoundToggle";

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const settings = await getSiteSettings();

  return (
    <div className="relative">
      <CustomCursor />
      <Navbar settings={settings} />
      <main>{children}</main>
      <Footer settings={settings} />

      <div className="pointer-events-none fixed bottom-6 left-6 z-40 hidden items-center gap-4 md:flex">
        <LiveTime className="pointer-events-auto font-sans text-[10px] uppercase tracking-[0.28em] text-taupe/70" />
      </div>
      <div className="pointer-events-none fixed bottom-6 right-6 z-40 hidden md:flex">
        <div className="pointer-events-auto">
          <SoundToggle />
        </div>
      </div>
    </div>
  );
}
