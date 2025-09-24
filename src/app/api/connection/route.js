import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(_request) {
  try {
    const users = await prisma.connection.findMany();
    const userArray = users.map((user) => {
      const { id, personOne, personTwo } = user;
      return { id, personOne, personTwo };
    });

    return NextResponse.json(userArray);
  } catch (error) {
    console.error("Error querying database:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
