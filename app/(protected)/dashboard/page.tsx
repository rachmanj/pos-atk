"use client";

import { useSession } from "next-auth/react";

import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";
import withAuth from "@/lib/withAuth";
import { User } from "@prisma/client";

const DashboardPage = () => {
  const { data: session } = useSession();
  console.log(session);
  const user = session?.user;
  console.log(user);

  return (
    <div className="p-4">
      <h1>Dashboard</h1>
      <div className="mt-4 space-y-4">
        <div className="p-4 border rounded-lg">
          <h2 className="text-xl font-semibold mb-2">User Information</h2>
          <div className="space-y-2">
            <p>
              <span className="font-medium">Username:</span>{" "}
              {session?.user?.username}
            </p>
            <p>
              <span className="font-medium">Name:</span> {user?.name}
            </p>
            <p>
              <span className="font-medium">Email:</span> {session?.user?.email}
            </p>
          </div>
        </div>

        <div className="p-4 border rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Roles & Permissions</h2>
          <div className="space-y-2">
            <div>
              <h3 className="font-medium">Roles:</h3>
              <ul className="list-disc list-inside">
                {session?.user?.userRoles?.map((role, index) => (
                  <li key={index}>{role.role}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-medium">Permissions:</h3>
              <ul className="list-disc list-inside">
                {session?.user?.userPerms?.map((perm, index: number) => (
                  <li key={index}>{perm.permission}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
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

export default withAuth(DashboardPage);
