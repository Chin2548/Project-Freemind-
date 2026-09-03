import { getHomepageContent } from "@/lib/data/homepage";
import { HomepageForm } from "@/components/admin/HomepageForm";

export default async function AdminHomepagePage() {
  const content = await getHomepageContent();

  return (
    <div>
      <h1 className="font-serif text-3xl text-ivory">Homepage</h1>
      <p className="mt-2 max-w-lg font-sans text-sm text-taupe">
        Every headline, line of copy, and background image on the homepage,
        section by section. Click a section to expand it.
      </p>
      <div className="mt-10">
        <HomepageForm content={content} />
      </div>
    </div>
  );
}
