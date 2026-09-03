import { isSupabaseConfigured } from "@/lib/supabase/env";
import { createClient } from "@/lib/supabase/server";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { NotConfigured } from "@/components/admin/NotConfigured";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  if (!isSupabaseConfigured) {
    return <NotConfigured />;
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      <AdminSidebar email={user?.email} />
      <main className="flex-1 px-6 py-10 md:px-12 md:py-14">{children}</main>
    </div>
  );
}
