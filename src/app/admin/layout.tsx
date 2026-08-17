import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { AdminShell } from "@/components/admin/AdminShell";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  const name = session?.user?.name || "Admin";

  return <AdminShell name={name}>{children}</AdminShell>;
}
