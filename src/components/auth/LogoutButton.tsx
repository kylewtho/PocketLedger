"use client";

import { LogOut } from "lucide-react";
import { logout } from "@/app/actions/auth";
import { Button } from "@/components/ui/Button";

export function LogoutButton() {
  return (
    <form action={logout}>
      <Button type="submit" variant="danger" size="sm">
        <LogOut className="h-4 w-4 mr-2" />
        Log out
      </Button>
    </form>
  );
}
