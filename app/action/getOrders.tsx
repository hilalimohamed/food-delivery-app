import prisma from "@/lib/prisma";
import getUser from "./getUser";

export default async function getOrders() {
  try {
    const user = await getUser();

    if (!user) {
      return null;
    }

    if (user.role === "ADMIN") {
      // If the user is an admin, get all orders
      const orders = await prisma.order.findMany({
        include: {
          orderItems: {
            include: {
              foodItem: true,
            },
          },
          user: true, // Include user details for each order
        },
        orderBy: {
          createdAt: "desc",
        },
      });
      return orders;
    } else {
      // If the user is not an admin, get only their orders
      const orders = await prisma.order.findMany({
        where: {
          userId: user.id,
        },
        include: {
          user: true,
          orderItems: {
            include: {
              foodItem: true,
            },
          },
        },
        orderBy: { createdAt: "desc" },
      });
      return orders;
    }
  } catch (error) {
    console.error("Error fetching orders:", error);
    return null;
  }
}
