import React from 'react'
import Navbar from '../../components/Navbar'
import MyGraph from '../../components/MyGraph'
import prisma from "../../lib/prisma"

export default async function page() {

    async function getUsers() {
        return await prisma.person.findMany()
    }
    const users = await getUsers()

    async function getConnection() {
        return await prisma.connection.findMany()
    }
    const connections = await getConnection()

    return (
        <>
            <Navbar></Navbar>
            <div className='flex flex-col items-center'>
                <MyGraph data={users} rel={connections}></MyGraph>
            </div>
        </>

    )
}