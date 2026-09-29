import Image from "next/image";
import Link from "next/link";
import { getAllMenuItemsAdmin } from "@/lib/data/menu";
import { getMenuCategories } from "@/lib/data/categories";
import { deleteMenuItem } from "@/lib/data/menu-actions";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { formatPrice } from "@/lib/utils";

export default async function AdminMenuPage() {
  const [items, categories] = await Promise.all([
    getAllMenuItemsAdmin(),
    getMenuCategories(),
  ]);
  const labelFor = (id: string) => categories.find((c) => c.id === id)?.label ?? id;

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-serif text-3xl text-ivory">Menu</h1>
        <div className="flex items-center gap-5">
          <Link
            href="/admin/categories"
            className="font-sans text-[11px] uppercase tracking-[0.18em] text-taupe transition-colors hover:text-cream"
          >
            Manage Categories
          </Link>
          <Link
            href="/admin/menu/new"
            className="border border-brass/60 px-4 py-2 font-sans text-xs uppercase tracking-[0.2em] text-ivory transition-colors hover:bg-brass/10"
          >
            + New Item
          </Link>
        </div>
      </div>

      <div className="mt-10 flex flex-col divide-y divide-walnut/40 border-t border-walnut/40">
        {items.length === 0 && (
          <p className="py-8 font-sans text-sm text-taupe">
            No menu items yet. Create the first one.
          </p>
        )}
        {items.map((item) => (
          <div key={item.id} className="flex items-center gap-4 py-4">
            <div className="relative h-14 w-14 shrink-0 overflow-hidden border border-walnut bg-espresso">
              {item.imageUrl && (
                <Image src={item.imageUrl} alt="" fill unoptimized className="object-cover" />
              )}
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-serif text-lg text-ivory">{item.name}</p>
              <p className="mt-1 font-sans text-[11px] uppercase tracking-[0.16em] text-taupe">
                {labelFor(item.category)} · {formatPrice(item.price, item.currency)}
                {!item.available && " · Unavailable"}
                {item.featured && " · Featured"}
              </p>
            </div>
            <div className="flex shrink-0 items-center gap-5">
              <Link
                href={`/admin/menu/${item.id}`}
                className="font-sans text-[11px] uppercase tracking-[0.18em] text-taupe transition-colors hover:text-cream"
              >
                Edit
              </Link>
              <DeleteButton action={deleteMenuItem.bind(null, item.id)} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
