import prisma from "@/lib/prisma";

export default async function getCategories() {
  try {
    const categories = await prisma.category.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    return categories;
  } catch (error) {
    return [];
  }
}
