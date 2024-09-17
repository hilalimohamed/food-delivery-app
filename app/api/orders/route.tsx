import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import getSession from "@/app/action/getSession";

export async function POST(req: NextRequest) {
  try {
    const session = await getSession();
    const { items, address, latitude, longitude } = await req.json();
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const order = await prisma.order.create({
      data: {
        userId: session.user.id,
        totalPrice: items.reduce(
          (total: number, item: { totalprice: number; quantity: number }) =>
            total + item.totalprice * item.quantity,
          0
        ),
        status: "Pending",
        orderItems: {
          create: items.map((item: any) => ({
            foodItemId: item.foodItemId,
            quantity: item.quantity,
            size: item.namesize,
            extraIngredients: item.extraIngredients
              .map((extra: any) => extra.name)
              .join(", "),
          })),
        },
        address,
        latitude,
        longitude,
      },
    });
    return NextResponse.json(
      { message: "Your order has been created and is pending", data: order },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "an error occurred" }, { status: 500 });
  }
}
