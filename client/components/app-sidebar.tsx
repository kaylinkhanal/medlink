import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
  } from "@/components/ui/sidebar"
import { ChevronDown, DollarSign, Home, Hospital } from "lucide-react"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./ui/collapsible"
import Link from "next/link"

  
  export function AppSidebar() {
    return (
      <Sidebar collapsible="icon">
       <SidebarGroup>
  <SidebarGroupContent>
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton asChild tooltip="Home"> 
          <Link href="/dashboard">
            <Home />
            <span>Home</span> {/* This span hides automatically */}
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>


      <SidebarMenuItem>
        <SidebarMenuButton asChild tooltip="Home"> 
          <Link href="/fund-raiser">
            <DollarSign />
            <span>Fund Raiser</span> {/* This span hides automatically */}
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>



      <SidebarMenuItem>
        <SidebarMenuButton asChild tooltip="Home"> 
          <Link href="/medical-help">
            <Hospital />
            <span>Medical Help</span> {/* This span hides automatically */}
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  </SidebarGroupContent>
</SidebarGroup>
      </Sidebar>
    )
  }