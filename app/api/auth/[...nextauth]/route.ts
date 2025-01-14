import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import { compare } from "bcryptjs";

const prisma = new PrismaClient();

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        userIdentifier: { label: "Email or Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.userIdentifier || !credentials?.password) {
          throw new Error("Please enter your email/username and password");
        }

        const user = await prisma.user.findFirst({
          where: {
            OR: [
              { email: credentials.userIdentifier },
              { username: credentials.userIdentifier },
            ],
          },
          include: {
            userRoles: true,
            userPerms: true,
          },
        });

        if (!user) throw new Error("No user found");

        const isPasswordValid = await compare(
          credentials.password,
          user.password
        );
        if (!isPasswordValid) throw new Error("Invalid password");

        return {
          id: user.id.toString(),
          email: user.email,
          username: user.username,
          name: user.name || undefined,
          userRoles: user.userRoles,
          userPerms: user.userPerms,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.userRoles = user.userRoles;
        token.userPerms = user.userPerms;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.userRoles = token.userRoles;
        session.user.userPerms = token.userPerms;
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/login",
  },
  session: {
    strategy: "jwt",
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
