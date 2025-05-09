"use client";
import * as React from "react";
import {
  Settings2,
  Package,
  History,
  House,
  ScanBarcode,
  ChartNoAxesColumn,
} from "lucide-react";
import { NavMain } from "@/components/NavMain";
import { NavUser } from "@/components/NavUser";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenuButton,
  SidebarRail,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useUserStore } from "@/providers/UserProvider";

const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "/",
      icon: House,
    },
    {
      title: "Cashier",
      url: "/cashier",
      icon: ScanBarcode,
    },
    {
      title: "Products",
      url: "/products",
      icon: Package,
    },
    {
      title: "History",
      url: "/history",
      icon: History,
    },
    {
      title: "Settings",
      url: "/settings",
      icon: Settings2,
    },
  ],
};

const authPages = ["/login", "/register", "/forgot-password", "/reset-password"];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user } = useUserStore((state) => state);
  const pathname = usePathname();

  const isAuthPage = authPages.some((path) => pathname.startsWith(path));

  if (isAuthPage) {
    return null;
  }

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenuButton size="lg" asChild>
          <Link href="/">
            <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
              <ChartNoAxesColumn size={20} />
            </div>
            <span className="text-lg font-semibold">ZenPOS</span>
          </Link>
        </SidebarMenuButton>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>{user && <NavUser user={user} />}</SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
