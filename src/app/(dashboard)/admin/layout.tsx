import { auth } from "@/actions/auth";
import { AuthGuard } from "@/components/auth/AuthGuard";
import SideNav from "@/components/ui/dashboard/sidenav";
import { redirect } from "next/navigation";

export default async function Layout({ children }: { children: React.ReactNode }) {
    const session = await auth();

    if (!session || session.user?.role !== "ADMIN") {
        redirect("/unauthorized");
    }
    return (
        <AuthGuard>
            <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
                <div className="w-full flex-none md:w-64">
                    <SideNav />
                </div>
                <div className="flex-grow p-6 md:overflow-y-auto md:p-12">{children}</div>
            </div>
        </AuthGuard>
    );
}