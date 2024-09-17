import prisma from "@/lib/prisma";

export async function getOrderId(orderId: string) {
  try {
    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: {
        user: true,
        orderItems: {
          include: {
            foodItem: true,
          },
        },
      },
    });
    return order;
  } catch (error) {
    console.error(error);
    return null;
  }
}
