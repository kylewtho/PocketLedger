"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/Button";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();

  const nextTheme = resolvedTheme === "dark" ? "light" : "dark";

  return (
    <Button
      type="button"
      variant="secondary"
      onClick={() => setTheme(nextTheme)}
      className="gap-2"
      aria-label="Toggle color theme"
    >
      {resolvedTheme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
      {resolvedTheme === "dark" ? "Use light mode" : "Use dark mode"}
    </Button>
  );
}
