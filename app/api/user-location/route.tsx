import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import getSession from "@/app/action/getSession";

export async function POST(req: NextRequest) {
  try {
    const session = await getSession();
    const { address, latitude, longitude, isPrimary } = await req.json();

    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const existingUserLocation = await prisma.userLocation.findFirst({
      where: {
        userId: session.user.id,
      },
    });

    const userLocationId = existingUserLocation?.id;

    const userLocation = await prisma.userLocation.upsert({
      where: {
        id: userLocationId || "",
      },
      update: {
        address,
        latitude,
        longitude,
        isPrimary,
      },
      create: {
        userId: session.user.id,
        address,
        latitude,
        longitude,
        isPrimary,
      },
    });

    return NextResponse.json(
      { message: "Location saved successfully!", data: userLocation },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "An error occurred" }, { status: 500 });
  }
}
