import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { SideNav } from "@/components/navigation/SideNav";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "PocketLedger",
  description: "A personal finance tracker",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="flex min-h-screen">
            <SideNav />
            <main className="flex-1 p-6 overflow-auto">
              {children}
            </main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
