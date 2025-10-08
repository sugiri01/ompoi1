import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  TrendingUp, 
  Newspaper, 
  BarChart3, 
  Calculator, 
  ShoppingCart,
  Users,
  Shield,
  Settings,
  Nut,
  Sprout,
  Factory,
  Truck,
  CreditCard,
  Package,
  Handshake,
  Globe,
  FileText,
  Building,
  Building2,
  GitBranch,
  Cog
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";

const mainItems = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  { title: "Export Management", url: "/export", icon: Globe },
  { title: "Procurement", url: "/procurement", icon: FileText },
  { title: "Sourcing Portal", url: "/sourcing", icon: Building },
  { title: "Inventory", url: "/inventory", icon: Package },
  { title: "Production", url: "/production", icon: Factory },
  { title: "Sales Platform", url: "/sales", icon: TrendingUp },
  { title: "Marketplace", url: "/marketplace", icon: ShoppingCart },
  { title: "B2B Platform", url: "/b2b", icon: Building2 },
  { title: "Distribution", url: "/distribution", icon: Truck },
  { title: "Manufacturing", url: "/manufacturing", icon: Cog },
  { title: "E-commerce", url: "/ecommerce", icon: ShoppingCart },
];

const marketIntelligenceItems = [
  { title: "Price Insights", url: "/prices", icon: TrendingUp },
  { title: "Market News", url: "/news", icon: Newspaper },
  { title: "Analysis", url: "/analysis", icon: BarChart3 },
  { title: "Calculator", url: "/calculator", icon: Calculator },
  { title: "Market Overview", url: "/market-overview", icon: Users },
  { title: "Quality Verification", url: "/quality-verification", icon: Shield },
  { title: "Seller Comparison", url: "/compare", icon: Users },
  { title: "Direct Trading", url: "/direct-trading", icon: Handshake },
];

const valueChainItems = [
  { title: "Farm Management", url: "/farm", icon: Sprout },
  { title: "Processing", url: "/processing", icon: Factory },
  { title: "Logistics", url: "/logistics", icon: Truck },
  { title: "Financial Services", url: "/finance", icon: CreditCard },
];

const commodityItems = [
  { title: "Raw Cashew Nuts", url: "/commodity/raw", icon: Nut },
  { title: "Cashew Kernels", url: "/commodity/kernels", icon: Nut },
  { title: "CNSL", url: "/commodity/cnsl", icon: Nut },
  { title: "By-products", url: "/commodity/byproducts", icon: Nut },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;
  const collapsed = state === "collapsed";

  const isActive = (path: string) => {
    if (path === "/") return currentPath === "/";
    return currentPath.startsWith(path);
  };

  const getNavClass = (path: string) => {
    const active = isActive(path);
    return active 
      ? "bg-primary text-primary-foreground font-medium shadow-soft" 
      : "hover:bg-accent/50 transition-fast";
  };

  return (
    <Sidebar className={`${collapsed ? "w-16" : "w-64"} border-r bg-gradient-soft`}>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className={collapsed ? "sr-only" : ""}>
            Main Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      end={item.url === "/"} 
                      className={getNavClass(item.url)}
                    >
                      <item.icon className="h-4 w-4" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className={collapsed ? "sr-only" : ""}>
            Market Intelligence
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {marketIntelligenceItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      className={getNavClass(item.url)}
                    >
                      <item.icon className="h-4 w-4" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className={collapsed ? "sr-only" : ""}>
            Value Chain Management
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {valueChainItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      className={getNavClass(item.url)}
                    >
                      <item.icon className="h-4 w-4" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className={collapsed ? "sr-only" : ""}>
            Commodities
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {commodityItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      className={getNavClass(item.url)}
                    >
                      <item.icon className="h-4 w-4" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="mt-auto">
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <NavLink 
                    to="/settings" 
                    className={getNavClass("/settings")}
                  >
                    <Settings className="h-4 w-4" />
                    {!collapsed && <span>Settings</span>}
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}