import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function PUT(req: NextRequest) {
  try {
    const { id, postalCode } = await req.json();
    const user = await prisma.user.update({
      where: { id },
      data: {
        postalCode,
        updatedAt: new Date(),
      },
    });
    return NextResponse.json(
      { message: "Your phone number has been updated" },
      { status: 201 }
    );
  } catch (error) {
    console.error("error : ", error);
    return NextResponse.json({ message: "an error occurred" }, { status: 500 });
  }
}
