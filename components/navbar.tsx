"use client";

import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

export const Navbar = () => {
  const { data: session } = useSession();

  return (
    <nav className="bg-gray-900 text-white p-2">
      <div className="container mx-auto flex items-center justify-between">
        {/* Left side - Logo/Text */}
        <div className="flex items-center space-x-8">
          <Link href="/" className="text-xl font-bold">
            POS System
          </Link>

          {/* Navigation Items with Dropdowns */}
          <div className="flex space-x-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="text-white">
                  Products
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>Product Management</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link href="/products">View Products</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/products/new">Add Product</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="text-white">
                  Sales
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>Sales Management</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link href="/sales">View Sales</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/sales/new">New Sale</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {session?.user?.userRoles?.some(
              (role) => role.role === "ADMIN"
            ) && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="text-white">
                    Admin
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuLabel>Administration</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Link href="/admin/users">Manage Users</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link href="/admin/settings">Settings</Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>

        {/* Right side - User Info */}
        <div className="flex items-center space-x-4">
          {session?.user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="text-white">
                  {session.user.name || session.user.email}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link href="/profile">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <button
                    onClick={() => signOut({ callbackUrl: "/auth/login" })}
                    className="w-full text-left"
                  >
                    Sign Out
                  </button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link href="/auth/login">
              <Button variant="ghost" className="text-white">
                Sign In
              </Button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};
