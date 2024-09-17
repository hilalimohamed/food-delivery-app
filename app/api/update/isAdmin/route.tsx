import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function PUT(req: NextRequest) {
  try {
    const { id, role } = await req.json();
    const user = await prisma.user.update({
      where: { id },
      data: {
        role,
        // updatedAt: new Date(),
      },
    });
    return NextResponse.json(
      { message: "User's role has been updated" },
      { status: 201 }
    );
  } catch (error) {
    console.error("error : ", error);
    return NextResponse.json({ message: "an error occurred" }, { status: 500 });
  }
}
