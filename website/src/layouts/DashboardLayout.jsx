import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { Outlet } from "react-router-dom";

export default function DashboardLayout() {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">

        {/* Sidebar */}
        <AppSidebar />

        {/* Main Content */}
        <div className="flex-1 flex flex-col">

          {/* Navbar */}
          <header className="flex items-center justify-between p-4 border-b">
            <SidebarTrigger />
            {/* <h1 className="text-lg font-semibold">Dashboard</h1> */}
          </header>

          {/* Page Content */}
          <main className="flex-1 p-4 md:p-6">
            <Outlet />
          </main>

        </div>
      </div>
    </SidebarProvider>
  );
}