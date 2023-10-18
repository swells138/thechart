const { PrismaClient } = require('@prisma/client');
const { NextResponse } = require('next/server');

const prisma = new PrismaClient();

async function GET(req, res) {
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
                personOne: connection.personOneDetails.firstName,
                personTwo: connection.personTwoDetails.firstName,
            };
        });

        return NextResponse.json(connectionsWithNamesAndPersons);
    } catch (error) {
        console.error("Error fetching connections with names:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}
module.exports = {
    GET
};