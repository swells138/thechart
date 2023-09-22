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
            <div className='bg-zinc-950'>
                <Navbar></Navbar>
                <div className='flex flex-col items-center pb-3'>
                    <h1 className='text-6xl font-medium'>Welcome to your Chart</h1>
                </div>
            </div>
            <div>
                <div className='flex justify-evenly'>
                    <div className='bg-zinc-950 h-screen w-1/3'>
                        <form id='form' action={create}>
                            <div className='flex flex-col mx-8'>
                                <label htmlFor="name" className="mb-2">Add A Node to Your Chart</label>
                                <input className='border rounded' id="name" name='name' placeholder='First Name'></input>
                                <button className='rounded bg-rose-400 p-2 mt-3' type='submit'>Add Node</button>
                            </div>
                        </form>
                        <form id='form' action={createConnection}>
                            <div className='flex flex-col mx-8'>
                                <label htmlFor="name" className="mb-2">Connect a Node</label>
                                <input className='border rounded' id="personOne" name='personOne' placeholder='Person One'></input>
                                <input className='border rounded mt-2' id="personTwo" name='personTwo' placeholder='Person Two'></input>
                                <button className='rounded bg-rose-400 p-2 mt-3' type='submit'>Add Connection</button>
                            </div>
                        </form>
                    </div>
                    <div className='mr-3'>
                        <MyGraph data={users} rel={connections}></MyGraph>
                    </div>
                </div>
            </div>
        </>

    )
}