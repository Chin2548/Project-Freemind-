import { MenuItemForm } from "@/components/admin/MenuItemForm";
import { createMenuItem } from "@/lib/data/menu-actions";

export default function NewMenuItemPage() {
  return (
    <div>
      <h1 className="font-serif text-3xl text-ivory">New Menu Item</h1>
      <div className="mt-10">
        <MenuItemForm action={createMenuItem} />
      </div>
    </div>
  );
}
