import { notFound } from "next/navigation";
import { MenuItemForm } from "@/components/admin/MenuItemForm";
import { getMenuItemByIdAdmin } from "@/lib/data/menu";
import { getMenuCategories } from "@/lib/data/categories";
import { updateMenuItem } from "@/lib/data/menu-actions";

export default async function EditMenuItemPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [item, categories] = await Promise.all([
    getMenuItemByIdAdmin(id),
    getMenuCategories(),
  ]);
  if (!item) notFound();

  return (
    <div>
      <h1 className="font-serif text-3xl text-ivory">Edit {item.name}</h1>
      <div className="mt-10">
        <MenuItemForm action={updateMenuItem.bind(null, id)} item={item} categories={categories} />
      </div>
    </div>
  );
}
