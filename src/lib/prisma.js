import { PrismaClient } from "@prisma/client";

let prismaClient = globalThis.__prismaClient ?? null;

export function getPrismaClient() {
  if (!process.env.DATABASE_URL) {
    return null;
  }

  if (!prismaClient) {
    prismaClient = new PrismaClient();

    if (process.env.NODE_ENV !== "production") {
      globalThis.__prismaClient = prismaClient;
    }
  }

  return prismaClient;
}

export async function create(formData) {
  "use server";

  const prisma = getPrismaClient();

  if (!prisma) {
    console.error("DATABASE_URL is not configured. Skipping create operation.");
    return;
  }

  const nameValue = formData.get("name");
  const lastNameValue = formData.get("last");
  const emailValue = formData.get("email");
  const colorValue = formData.get("color");
  const ageValue = formData.get("age");
  const cityValue = formData.get("city");
  const stateValue = formData.get("state");

  const newUser = await prisma.person.create({
    data: {
      firstName: nameValue,
      lastName: lastNameValue,
      email: emailValue,
      color: colorValue,
      age: ageValue,
      city: cityValue,
      state: stateValue,
    },
  });

  await prisma.connection.create({
    data: {
      personOneDetails: {
        connect: { id: newUser.id },
      },
      personTwoDetails: {
        connect: { id: 2 },
      },
    },
  });
}
