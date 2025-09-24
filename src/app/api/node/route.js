import { NextResponse } from "next/server";
import { getPrismaClient } from "../../../lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  const prisma = getPrismaClient();

  if (!prisma) {
    console.warn("DATABASE_URL is not configured. Returning empty person list.");
    return NextResponse.json([]);
  }

  try {
    const users = await prisma.person.findMany();
    const userArray = users.map((user) => {
      const { id, firstName, lastName, color, age } = user;
      return { id, firstName, lastName, color, age };
    });

    return NextResponse.json(userArray);
  } catch (error) {
    console.error("Error querying database:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
