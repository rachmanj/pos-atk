import "next-auth";
import { UserRole, UserPermission } from "@prisma/client";

declare module "next-auth" {
  interface Session {
    user: {
      id?: string;
      username?: string;
      name?: string | null;
      email?: string | null;
      userRoles?: UserRole[];
      userPerms?: UserPermission[];
    };
  }
  interface User {
    id?: string;
    username?: string;
    name?: string;
    userRoles?: UserRole[];
    userPerms?: UserPermission[];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    username?: string;
    name?: string;
    userRoles?: UserRole[];
    userPerms?: UserPermission[];
  }
}
