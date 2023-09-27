import React from 'react'
import prisma from "../../lib/prisma"
import Drawer from "../../components/Drawer"

export default async function page() {

    async function getUsers() {
        return await prisma.person.findMany()
    }
    const users = await getUsers()

    async function getConnection() {
        return await prisma.connection.findMany()
    }
    const connections = await getConnection()

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

    return (
        <>
            <div>
                <Drawer connect={createConnection} create={create} data={users} rel={connections}></Drawer>
            </div>
        </>
    )
}