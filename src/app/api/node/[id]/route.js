import { NextResponse } from "next/server";
import { getPrismaClient } from "../../../../lib/prisma";

export const dynamic = "force-dynamic";

export async function GET(_request, { params }) {
  const prisma = getPrismaClient();

  if (!prisma) {
    console.warn("DATABASE_URL is not configured. Returning not found response for node lookup.");
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const userId = Number.parseInt(params.id, 10);

  if (Number.isNaN(userId)) {
    return NextResponse.json({ error: "Invalid user id" }, { status: 400 });
  }

  try {
    const user = await prisma.person.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const { id, firstName, lastName, city, state, color, age } = user;
    const json = {
      id,
      firstName,
      lastName,
      city,
      state,
      color,
      age,
    };
    return NextResponse.json(json);
  } catch (error) {
    console.error("Error querying database:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
