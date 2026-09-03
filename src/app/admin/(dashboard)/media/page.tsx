import { listMedia } from "@/lib/data/media-actions";
import { MediaUploader } from "@/components/admin/MediaUploader";
import { MediaGrid } from "@/components/admin/MediaGrid";

export default async function AdminMediaPage() {
  const files = await listMedia();

  return (
    <div>
      <h1 className="font-serif text-3xl text-ivory">Media</h1>
      <p className="mt-2 max-w-md font-sans text-sm text-taupe">
        Upload photography here, then copy the URL into a menu item or event.
      </p>

      <div className="mt-8">
        <MediaUploader />
      </div>

      <div className="mt-10">
        <MediaGrid files={files} />
      </div>
    </div>
  );
}
