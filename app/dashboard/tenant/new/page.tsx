import { createClient } from "@/lib/supabase";
import { redirect } from "next/navigation";
import TenantWizard from "@/components/tenant-wizard";

export default async function NewTenantPage() {
  try {
    const supabase = createClient(); const { data: { session } } = await supabase.auth.getSession(); const userId = session?.user.id;
    if (!userId) redirect("/");
  } catch (error) {
    redirect("/");
  }
  return (
    <div className="py-8 px-4">
      <TenantWizard />
    </div>
  );
}