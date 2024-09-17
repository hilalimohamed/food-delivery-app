import prisma from "@/lib/prisma";

export default async function getCategories() {
  try {
    const categories = await prisma.category.findMany();
    return categories;
  } catch (error) {
    return [];
  }
}
