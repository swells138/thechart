const { PrismaClient } = require('@prisma/client');
const { NextResponse } = require('next/server');

const prisma = new PrismaClient();

async function GET(request, _) {
    try {
        const users = await prisma.person.findMany();
        const userArray = users.map(user => {
            const { id, firstName, lastName, color, age } = user;
            return { id, firstName, lastName, color, age };
        });

        return NextResponse.json(userArray);
    } catch (error) {
        console.error('Error querying database:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}

module.exports = {
    GET
};
