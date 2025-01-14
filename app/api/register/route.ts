import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { hash } from "bcryptjs";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { username, email, password } = await req.json();

    // Check if user already exists
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ email }, { username }],
      },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "User with this email or username already exists" },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await hash(password, 10);

    // Create user
    const user = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
        userRoles: {
          create: {
            role: "USER",
          },
        },
        userPerms: {
          create: [], // No default permissions
        },
      },
    });

    return NextResponse.json({
      user: {
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    return NextResponse.json({ error: "Error creating user" }, { status: 500 });
  }
}
