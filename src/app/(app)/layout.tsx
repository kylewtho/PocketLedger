import { SideNav } from "@/components/navigation/SideNav";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <SideNav />
      <main className="flex-1 p-6 overflow-auto">{children}</main>
    </div>
  );
}
