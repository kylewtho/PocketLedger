"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Wallet, BookOpen, Settings, PiggyBank } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Accounts", href: "/accounts", icon: Wallet },
  { label: "Entries", href: "/entries", icon: BookOpen },
  { label: "Settings", href: "/settings", icon: Settings },
];

export function SideNav() {
  const pathname = usePathname();

  return (
    <aside className="w-64 border-r border-border bg-background flex flex-col min-h-screen">
      <div className="p-6 border-b border-border">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl">
          <PiggyBank className="h-6 w-6 text-primary-600" />
          <span>PocketLedger</span>
        </Link>
      </div>
      <nav className="flex-1 p-4 space-y-1">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary-600 text-white"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
