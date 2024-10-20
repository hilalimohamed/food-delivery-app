// prisma/seed.ts
// import { PrismaClient } from "@prisma/client";
import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";

// const prisma = new PrismaClient();

async function main() {
  const adminEmail = "samir@gmail.com";

  const existingAdmin = await prisma.user.findUnique({
    where: { email: adminEmail },
  });

  if (!existingAdmin) {
    const hashedPassword = await bcrypt.hash("samirA1&", 10);

    // Create the default admin user
    await prisma.user.create({
      data: {
        email: adminEmail,
        name: "Admin User",
        password: hashedPassword,
        role: "ADMIN",
      },
    });

    console.log("Admin user created successfully!");
  } else {
    console.log("Admin user already exists.");
  }
}

main()
  .then(() => {
    console.log("Seeding completed");
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
