import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import sidebarLogo from "@/assets/icons/logo-sidebar.png"
import { Home, LogOut, Plus, Users,Folder,MessageSquare,FileText,CheckSquare } from "lucide-react"
import { Link, useLocation } from "react-router-dom";
import { useDialog } from "@/context/DialogContext";
export function AppSidebar() {
  const { openUpload } = useDialog();
const menuItems = [
  { name: "Dashboard", path: "/dashboard", icon: Home },
  { name: "Documents", path: "/dashboard/documents", icon: Folder },
  { name :"Chat", path: "/dashboard/chat", icon: MessageSquare },
  { name :"Summary", path: "/dashboard/summary", icon: FileText },
  { name :"MCQs", path: "/dashboard/mcqs", icon: CheckSquare }
];

const location = useLocation();
const isActive = (path) => location.pathname === path;

  return (
    <Sidebar className="p-4 bg-[#F8FAFC]">
      <SidebarHeader>
        <div className="flex items-center gap-3">
            <img src={sidebarLogo} alt="" className="w-8 h-8"/>
        <div>
            <h2 className="text-xl font-bold text-[#6760FD]">DocuMind AI</h2>
            <p className="text-[12px] text-[#94A3B8]">AI DOCUMENT ASSISTANT</p>
        </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        {/* GROUP 1 */}
        <SidebarGroup>
          <SidebarMenu>

             {
                menuItems.map((item) => (
                  <SidebarMenuItem key={item.name} className={isActive(item.path) ? "bg-white my-2" : "my-2"}>
                    <Link to={item.path} >
                    <SidebarMenuButton
                      className={`py-4`}
                    >
                      
                        <item.icon className={isActive(item.path) ? "mr-2 h-5 w-5 text-[#4F46E5]" : "mr-2 h-5 w-5 text-[#64748B]"} />
                        <p className={ isActive(item.path) ? "text-sm text-[#4F46E5] font-semibold" : "text-sm text-[#64748B]" }>{item.name}</p>
                      
                    </SidebarMenuButton>
                    </Link>
                  </SidebarMenuItem>
                ))
              }

          </SidebarMenu>
        </SidebarGroup>
        
      </SidebarContent>
      {/* FOOTER */}
<SidebarFooter className="p-4 space-y-3">

  {/* Add Document Button */}
  <SidebarMenu>
    <SidebarMenuItem>
      <SidebarMenuButton
        onClick={openUpload}
        className="bg-[#4F46E5] text-white hover:text-white cursor-pointer hover:bg-[#4F46E5]/90 rounded-[24px] px-4 py-3 text-sm font-semibold flex items-center justify-center h-[40px]"
      >
        <Plus className="h-4 w-4" />
        Add Document
      </SidebarMenuButton>
    </SidebarMenuItem>
  </SidebarMenu>

  {/* Logout Button */}
  <SidebarMenu>
    <SidebarMenuItem>
      <SidebarMenuButton className="text-red-500 hover:bg-red-100 dark:hover:bg-red-900/30">
        <LogOut className="mr-2 h-4 w-4" />
        Logout
      </SidebarMenuButton>
    </SidebarMenuItem>
  </SidebarMenu>

</SidebarFooter>
    </Sidebar>
  )
}