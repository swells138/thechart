import { PrismaClient } from '@prisma/client'

const prisma = global.prisma = new PrismaClient()

async function getUsers() {
    return await prisma.person.findMany()
}

async function getConnection() {
    try {
        const connections = await prisma.connection.findMany();
        return connections;
    } catch (error) {
        console.error("Error fetching connections:", error);
        throw error;
    }
}

async function getOneNode(node) {
    'use server'
    return prisma.person.findUnique({
        where: {
            id: +node
        }
    })
}

async function create(event) {
    "use server"
    var inputValue = event.get("name");

    await prisma.person.create({
        data: {
            name: inputValue
        }
    })
}

async function createConnection(event) {
    const inputValueOne = event.get("personOne");
    const inputValueTwo = event.get("personTwo");

    // Query the database to find personOne and personTwo based on names
    const personOne = await prisma.person.findFirst({
        where: {
            name: inputValueOne,
        },
    });

    const personTwo = await prisma.person.findFirst({
        where: {
            name: inputValueTwo,
        },
    });

    // Check if both persons were found
    if (!personOne || !personTwo) {
        throw new Error("Invalid person names provided");
    }

    // Create the connection using the retrieved person IDs and correct format
    await prisma.connection.create({
        data: {
            personOneDetails: {
                connect: { id: personOne.id }
            },
            personTwoDetails: {
                connect: { id: personTwo.id }
            }
        },
    });
}

async function getConnectionNames() {
    try {
        const connectionsWithNames = await prisma.connection.findMany({
            include: {
                personOneDetails: true,
                personTwoDetails: true,
            },
        });

        const connectionsWithNamesAndPersons = connectionsWithNames.map(connection => {
            return {
                id: connection.id,
                personOne: connection.personOneDetails.name,
                personTwo: connection.personTwoDetails.name,
            };
        });

        return connectionsWithNamesAndPersons;
    } catch (error) {
        console.error("Error fetching connections with names:", error);
        throw error;
    }
}

if (process.env.NODE_ENV === 'development') global.prisma = prisma

module.exports = {
    getOneNode, getConnection, getUsers, create, createConnection, getConnectionNames, prisma
}