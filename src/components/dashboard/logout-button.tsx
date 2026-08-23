"use client";

import { useState } from "react";
import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { getLogoutUrl } from "@/app/actions/auth";

export function LogoutButton() {
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    try {
      // 1. Get the federated logout URL from the server, passing active browser origin
      const logoutUrl = await getLogoutUrl(window.location.origin);

      // 2. Perform local NextAuth signout
      await signOut({ redirect: false });

      if (logoutUrl) {
        // 3. Redirect to WSO2 to clear the SSO session
        window.location.href = logoutUrl;
      } else {
        // Fallback redirection if no ID token is available
        window.location.href = "/login";
      }
    } catch (error) {
      console.error("Logout failed:", error);
      // Final fallback
      await signOut({ callbackUrl: "/login" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      type="button"
      variant="outline"
      className="gap-2 border-gray-200 bg-white text-gray-700 hover:bg-gray-50 hover:text-gray-900 dark:border-gray-800 dark:bg-gray-950 dark:text-gray-200 dark:hover:bg-gray-900"
      onClick={handleLogout}
      disabled={loading}
    >
      <LogOut className="h-4 w-4" />
      {loading ? "Logging out..." : "Log out"}
    </Button>
  );
}
