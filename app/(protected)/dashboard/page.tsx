"use client";

import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";

const DashboardPage = () => {
  return (
    <div className="p-4">
      <h1>Dashboard</h1>
      <Button
        onClick={() => signOut({ callbackUrl: "/auth/login" })}
        variant="destructive"
        className="mt-4"
      >
        Sign Out
      </Button>
    </div>
  );
};

export default DashboardPage;
