import { DashboardHeader } from "@/src/components/lister-dashboard/ui/DashboardHeader";
import { DashboardSidebar } from "@/src/components/lister-dashboard/ui/DashboardSidebar";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-background text-ink">
      <DashboardSidebar />

      <div className="min-h-screen lg:pl-64">
        <DashboardHeader />

        <main className="px-5 py-8 sm:px-8 lg:px-10">
          <div className="mx-auto w-full max-w-7xl">{children}</div>
        </main>
      </div>
    </div>
  );
}
