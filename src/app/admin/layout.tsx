import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminHeader } from "@/components/admin/AdminHeader";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  const name = session?.user?.name || "Admin";

  return (
    <div className="min-h-screen bg-[#F5F0E8] dark:bg-[#1A1816]">
      <AdminSidebar />
      <div className="flex min-h-screen flex-col lg:ml-72">
        <AdminHeader name={name} />
        <main className="flex-1 p-8">{children}</main>
      </div>
    </div>
  );
}
