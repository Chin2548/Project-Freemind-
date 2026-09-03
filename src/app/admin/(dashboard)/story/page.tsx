import { getStoryContent } from "@/lib/data/story";
import { StoryForm } from "@/components/admin/StoryForm";

export default async function AdminStoryPage() {
  const content = await getStoryContent();

  return (
    <div>
      <h1 className="font-serif text-3xl text-ivory">Story Page</h1>
      <p className="mt-2 max-w-lg font-sans text-sm text-taupe">
        The opening statement and every text-and-image section on the Story
        page, in order.
      </p>
      <div className="mt-10">
        <StoryForm content={content} />
      </div>
    </div>
  );
}
