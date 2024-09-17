import prisma from "@/lib/prisma";
import getSession from "./getSession";

export default async function getUsers() {
  try {
    const session = await getSession();
    if (!session?.user?.email) {
      return [];
    }
    const users = await prisma.user.findMany({
      where: {
        NOT: {
          email: session.user.email,
        },
      },
      orderBy:{
        createdAt: "asc"
      }
    });
    if (!users) {
      return [];
    }
    return users;
  } catch (error: any) {
    return [];
  }
}
