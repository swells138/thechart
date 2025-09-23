const { PrismaClient } = require("@prisma/client");
const { NextResponse } = require("next/server");

const prisma = new PrismaClient();

async function GET(request, _) {
  try {
    const connections = await prisma.connection.findMany({
      where: {
        OR: [{ personOne: 2 }, { personTwo: 2 }],
      },
    });

    const userIds = connections.map((connection) => {
      if (connection.personOne !== 2) {
        return connection.personOne;
      } else {
        return connection.personTwo;
      }
    });

    if (!userIds.includes(2)) {
      userIds.push(2);
    }

    const users = await prisma.person.findMany({
      where: {
        id: {
          in: userIds,
        },
      },
    });

    const userArray = users.map((user) => {
      const { id, firstName, color, age } = user;
      return { id, firstName, color, age };
    });

    const connectionArray = connections.map((connection) => {
      const { id, personOne, personTwo } = connection;
      return { id, personOne, personTwo };
    });

    return NextResponse.json({ users: userArray, connections: connectionArray });
  } catch (error) {
    console.error("Error querying database:", error);
    return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}

module.exports = {
  GET,
};
