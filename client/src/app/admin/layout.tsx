import { validateAdmin } from "@/lib/api/users";
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  // if (!session.isSignedIn) redirect("/signin");
  const res = await validateAdmin(session.access_token);

  if (!res?.isAdmin) {
    redirect("/");
  }

  return <>{children}</>;
}
