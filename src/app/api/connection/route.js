import { NextResponse } from "next/server";
import { getPrismaClient } from "../../../lib/prisma";

export const dynamic = "force-dynamic";

export async function GET(_request) {
  const prisma = getPrismaClient();

  if (!prisma) {
    console.warn("DATABASE_URL is not configured. Returning empty connection list.");
    return NextResponse.json([]);
  }

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
  }
}
