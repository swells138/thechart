import { NextResponse } from "next/server";
import { getPrismaClient } from "../../../lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  const prisma = getPrismaClient();

  if (!prisma) {
    console.warn("DATABASE_URL is not configured. Returning empty named connections list.");
    return NextResponse.json([]);
  }

  try {
    const connectionsWithNames = await prisma.connection.findMany({
      include: {
        personOneDetails: true,
        personTwoDetails: true,
      },
    });

    const connectionsWithNamesAndPersons = connectionsWithNames.map((connection) => {
      return {
        id: connection.id,
        personOne: connection.personOneDetails.firstName,
        personTwo: connection.personTwoDetails.firstName,
      };
    });

    return NextResponse.json(connectionsWithNamesAndPersons);
  } catch (error) {
    console.error("Error fetching connections with names:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
