// scripts/create-user.ts

import { PrismaClient } from "@/db/generated/prisma"; // Ajusta si la ruta difiere
import { hashPassword } from "@/backend/utils/hash";

const prisma = new PrismaClient();

async function main() {
  const email = "juan@email.com";
  const username = "Juan";
  const plainPassword = "juan123";
  const role = "ADMIN"; // Cambia según tu enum de roles o esquema

  const hashedPassword = await hashPassword(plainPassword);

  const user = await prisma.user.upsert({
    where: { email },
    update: {},
    create: {
      email,
      username,
      password: hashedPassword,
      role,
    },
  });

  console.log("✅ Usuario insertado o ya existente:", user);
}

main()
  .catch((e) => {
    console.error("❌ Error al crear el usuario:", e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });

