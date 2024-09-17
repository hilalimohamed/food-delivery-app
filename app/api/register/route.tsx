import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const { name, email, password } = await req.json();
    console.log("Received data:", { name, email, password });

    if (!name || !email || !password) {
      console.log("Invalid data:", { name, email, password });
      return NextResponse.json({ message: "invalid data" }, { status: 402 });
    }

    const existingEmail = await prisma.user.findUnique({
      where: { email },
    });

    if (existingEmail) {
      console.log("Email already exists:", email);
      return NextResponse.json(
        { message: "email already exist" },
        { status: 422 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    console.log("User created:", user);
    return NextResponse.json(
      { message: "user created", data: user },
      { status: 201 }
    );
  } catch (error) {
    console.error("Server error:", error);
    return NextResponse.json({ message: "an error occurred" }, { status: 500 });
  }
}
