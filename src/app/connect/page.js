import React from 'react'
import { getUsers, getConnection, create, createConnection, getConnectionNames, getOneNode } from "../../lib/prisma"
import Drawer from "../../components/Drawer"

export default async function page() {

    async function createNodeRelationship(userData) {
        'use server'
        try {
            createConnection(userData);
        } catch (error) {
            console.error('Error creating user:', error);
        }
    }

    async function createNode(userData) {
        'use server'
        try {
            create(userData);
        } catch (error) {
            console.error('Error creating user:', error);
        }
    }

    async function getConnectionNamesData() {
        'use server'
        try {
            return getConnectionNames()
        } catch (error) {
            console.error("error poop")
        }
    }
    const connectionsListNames = await getConnectionNamesData()

    return (
        <>
            <div>
                <Drawer
                    connect={createNodeRelationship}
                    create={createNode}
                    namedConnect={connectionsListNames}
                ></Drawer>
            </div>
        </>
    )
}