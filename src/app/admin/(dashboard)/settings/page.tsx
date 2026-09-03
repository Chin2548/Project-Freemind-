import { getSiteSettings } from "@/lib/data/settings";
import { SettingsForm } from "@/components/admin/SettingsForm";

export default async function AdminSettingsPage() {
  const settings = await getSiteSettings();

  return (
    <div>
      <h1 className="font-serif text-3xl text-ivory">Site Settings</h1>
      <div className="mt-10">
        <SettingsForm settings={settings} />
      </div>
    </div>
  );
}
