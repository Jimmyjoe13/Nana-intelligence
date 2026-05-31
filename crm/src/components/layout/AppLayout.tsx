"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { supabase } from "@/lib/supabase";
import { 
  LayoutDashboard, 
  Users, 
  Kanban,
  Mail,
  Send,
  BarChart3,
  Settings,
  HelpCircle,
  Search,
  Bell,
  LogOut
} from "lucide-react";

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
}

const mainNavItems: NavItem[] = [
  { label: "Dashboard", href: "/dashboard", icon: <LayoutDashboard size={18} /> },
  { label: "Prospects", href: "/prospects", icon: <Users size={18} /> },
  { label: "Pipeline", href: "/pipeline", icon: <Kanban size={18} /> },
  { label: "Séquences", href: "/sequences", icon: <Mail size={18} /> },
  { label: "Campagnes", href: "/campaigns", icon: <Send size={18} /> },
  { label: "Reporting", href: "/reporting", icon: <BarChart3 size={18} /> },
];

const secondaryNavItems: NavItem[] = [
  { label: "Settings", href: "/settings", icon: <Settings size={18} /> },
  { label: "Aide", href: "/help", icon: <HelpCircle size={18} /> },
];

export function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  const isNavItemActive = (href: string) => {
    return pathname.startsWith(href);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  return (
    <div className="flex h-screen bg-cream">
      {/* Sidebar */}
      <aside className="w-[240px] flex-shrink-0 border-r-[1.5px] border-ink flex flex-col bg-cream z-20">       
        <div className="h-14 flex items-center px-6 border-b-[1.5px] border-ink">
          <span className="font-display text-[18px] font-medium text-ink">
            N. Intelligence
          </span>
        </div>

        <nav className="flex-1 py-6 flex flex-col justify-between">
          <div className="flex flex-col gap-1">
            {mainNavItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative flex items-center gap-3 px-6 py-[14px] font-mono text-[12px] font-medium tracking-[0.08em] uppercase transition-colors hover:bg-cream-2 text-ink-3",
                  isNavItemActive(item.href) && "bg-cream-2 text-ink"
                )}
              >
                {isNavItemActive(item.href) && (
                  <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-orange" />
                )}
                {item.icon}
                {item.label}
              </Link>
            ))}
          </div>

          <div className="flex flex-col gap-1">
            <div className="px-6 mb-2">
              <div className="h-[1.5px] w-full bg-cream-3" />
            </div>
            {secondaryNavItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative flex items-center gap-3 px-6 py-[14px] font-mono text-[12px] font-medium tracking-[0.08em] uppercase transition-colors hover:bg-cream-2 text-ink-3",
                  isNavItemActive(item.href) && "bg-cream-2 text-ink"
                )}
              >
                {isNavItemActive(item.href) && (
                  <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-orange" />
                )}
                {item.icon}
                {item.label}
              </Link>
            ))}
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Topbar */}
        <header className="h-14 border-b-[1.5px] border-ink flex items-center justify-between px-10 bg-cream">  
          <div className="flex items-center gap-3 text-ink-4 max-w-md w-full">
            <Search size={18} />
            <input
              type="text"
              placeholder="RECHERCHE GLOBALE..."
              className="bg-transparent border-none focus:outline-none font-mono text-[11px] tracking-wider w-full"
            />
          </div>
          <div className="flex items-center gap-6">
            <button className="text-ink-3 hover:text-ink transition-colors">
              <Bell size={20} />
            </button>
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-full border-[1.5px] border-ink overflow-hidden bg-cream-2 relative">
                <Image
                  src="https://api.dicebear.com/7.x/avataaars/svg?seed=Jimmy"
                  alt="User Avatar"
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
              <button 
                onClick={handleLogout}
                className="p-2 border-[1.5px] border-ink hover:bg-ink hover:text-cream transition-colors"
                title="Déconnexion"
              >
                <LogOut size={16} />
              </button>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-auto p-10">
          <div className="max-w-[1400px] mx-auto w-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
