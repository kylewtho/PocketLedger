import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
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
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
