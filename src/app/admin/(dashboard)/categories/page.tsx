import { getMenuCategories } from "@/lib/data/categories";
import { CategoryManager } from "@/components/admin/CategoryManager";

export default async function AdminCategoriesPage() {
  const categories = await getMenuCategories();

  return (
    <div>
      <h1 className="font-serif text-3xl text-ivory">Menu Categories</h1>
      <p className="mt-2 max-w-lg font-sans text-sm text-taupe">
        The tabs shown on the Menu page, in order. Drag order with the arrows,
        rename in place, or add a new one below.
      </p>
      <div className="mt-10">
        <CategoryManager categories={categories} />
      </div>
    </div>
  );
}
