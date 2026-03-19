"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Wallet, BookOpen, Settings, PiggyBank } from "lucide-react";
import { cn } from "@/lib/utils";
import { SheetContent, SheetHeader, SheetTitle } from "@/components/ui/Sheet";

const NAV_ITEMS = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Accounts", href: "/accounts", icon: Wallet },
  { label: "Entries", href: "/entries", icon: BookOpen },
  { label: "Settings", href: "/settings", icon: Settings },
];

interface SideNavProps {
  onNavigate?: () => void;
  mobile?: boolean;
}

function NavItems({ onNavigate }: Pick<SideNavProps, "onNavigate">) {
  const pathname = usePathname();

  return (
    <nav className="flex-1 space-y-1 p-4">
      {NAV_ITEMS.map((item) => {
        const Icon = item.icon;
        const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            className={cn(
              "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
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
  );
}

export function SideNav({ onNavigate, mobile = false }: SideNavProps) {
  if (mobile) {
    return (
      <SheetContent side="left" className="w-72 p-0">
        <SheetHeader className="border-b border-border p-4">
          <SheetTitle className="sr-only">PocketLedger navigation</SheetTitle>
          <Link href="/" className="flex items-center gap-2 text-lg font-bold" onClick={onNavigate}>
            <PiggyBank className="h-5 w-5 text-primary-600" />
            <span>PocketLedger</span>
          </Link>
        </SheetHeader>
        <NavItems onNavigate={onNavigate} />
      </SheetContent>
    );
  }

  return (
    <aside className="hidden min-h-screen w-64 border-r border-border bg-background md:flex md:flex-col">
      <div className="border-b border-border p-6">
        <Link href="/" className="flex items-center gap-2 text-xl font-bold">
          <PiggyBank className="h-6 w-6 text-primary-600" />
          <span>PocketLedger</span>
        </Link>
      </div>
      <NavItems />
    </aside>
  );
}
