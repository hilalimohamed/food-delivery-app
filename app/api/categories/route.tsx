import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const { name, imageUrl } = await req.json();
    if (!name) {
      console.log("Invalid data:", { name });
      return NextResponse.json({ message: "invalid data" }, { status: 402 });
    }
    const existingCategory = await prisma.category.findUnique({
      where: { name },
    });
    if (existingCategory) {
      console.log("category already exists:", name);
      return NextResponse.json(
        { message: "category already exist" },
        { status: 422 }
      );
    }
    const category = await prisma.category.create({
      data: {
        name,
        imageUrl,
      },
    });
    return NextResponse.json(
      { message: "category created", data: category },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "an error occurred" }, { status: 500 });
  }
}

// export async function GET() {
//   try {
//     const categories = await prisma.category.findMany();
//     return NextResponse.json({ data: categories }, { status: 200 });
//   } catch (error) {
//     console.log(error);
//     return NextResponse.json({ message: "an error occurred" }, { status: 500 });
//   }
// }

export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json();
    if (!id) {
      return NextResponse.json({ message: "invalid data" }, { status: 402 });
    }
    const category = await prisma.category.delete({
      where: { id },
    });
    return NextResponse.json(
      { message: "category deleted", data: category },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "an error occurred" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const { id, name, imageUrl } = await req.json();
    if (!id || !name || !imageUrl) {
      return NextResponse.json({ message: "invalid data" }, { status: 402 });
    }
    const category = await prisma.category.update({
      where: { id },
      data: { name, imageUrl },
    });
    return NextResponse.json(
      { message: "category updated", data: category },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "an error occurred" }, { status: 500 });
  }
}
