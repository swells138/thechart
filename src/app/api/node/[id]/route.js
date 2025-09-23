const { PrismaClient } = require("@prisma/client");
const { NextRequest, NextResponse } = require("next/server");

const prisma = new PrismaClient();

async function GET(request, { params }) {
  const userId = parseInt(params.id); // Assuming id is a number, parse it if necessary

  try {
    const user = await prisma.person.findUnique({
      where: {
        id: userId,
      },
    });

    if (user) {
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
    } else {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
  } catch (error) {
    console.error("Error querying database:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}

module.exports = {
  GET,
};
