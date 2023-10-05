import { PrismaClient } from '@prisma/client'

const prisma = global.prisma = new PrismaClient()

async function getUsers() {
    return await prisma.person.findMany()
}


async function getConnection() {
    return await prisma.connection.findMany()
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
    'use server'
    var inputValueOne = event.get("personOne");
    var inputValueTwo = event.get("personTwo");

    await prisma.connection.create({
        data: {
            personOne: inputValueOne,
            personTwo: inputValueTwo
        }
    })
}

if (process.env.NODE_ENV === 'development') global.prisma = prisma

module.exports = {
    getOneNode, getConnection, getUsers, create, createConnection, prisma
}