import prisma from "@/lib/prisma";

export default async function getFoodItemId(itemId: string) {
  try {
    const foodItemId = await prisma.foodItem.findMany({
      where: {
        id: itemId,
      },
      include: {
        category: true,
        sizes: true,
        extraIngredients: true,
        detailImages: true,
        reviews: {
          include: { user: true },
        },
      },
    });
    return foodItemId;
  } catch (error) {
    return [];
  }
}
