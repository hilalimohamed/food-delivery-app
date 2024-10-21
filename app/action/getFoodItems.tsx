import prisma from "@/lib/prisma";

export default async function getFoodItems() {
  try {
    const foodItem = await prisma.foodItem.findMany({
      include: {
        category: true,
        sizes: true,
        extraIngredients: true,
        detailImages: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return foodItem;
  } catch (error) {
    return [];
  }
}
