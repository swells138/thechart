import React from 'react'
import { getUsers, getConnection, create, createConnection, getConnectionNames } from "../../lib/prisma"
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

    async function getNodeConnections() {
        'use server'
        try {
            return getConnection()
        } catch (error) {
            console.error("error poop")
        }
    }
    const connectionsList = await getNodeConnections()

    async function getGraphNodes() {
        'use server'
        try {
            return getUsers()
        } catch (error) {
            console.error("error poop")
        }
    }
    const users = await getGraphNodes()

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
                    data={users}
                    rel={connectionsList}
                    namedConnect={connectionsListNames}
                ></Drawer>
            </div>
        </>
    )
}