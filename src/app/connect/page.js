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


    async function create(event) {
        'use server'
        var inputValue = event.get("name");

        await prisma.person.create({
            data: {
                name: inputValue
            }
        })
    }

    return (
        <>
            <Navbar></Navbar>
            <div>
                <div className='flex justify-around pt-5'>
                    <div>
                        <h1>Something Will Go Here</h1>
                    </div>
                    <div>
                        <MyGraph data={users} rel={connections}></MyGraph>
                    </div>
                    <div>
                        <form id='form' action={create}>
                            <div className='flex flex-col items-center'>
                                <label htmlFor="name" className="mb-2 italic">Name</label>
                                <input id="name" name='name'></input>
                                <button className='rounded bg-rose-400 p-2 mt-3' type='submit'>Add Node</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>

    )
}