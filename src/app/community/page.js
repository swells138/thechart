import React from 'react'
import BigGraph from "../../components/BigGraph"
import Navbar from '../../components/Navbar'

const page = () => {
    return (
        <>
            <Navbar></Navbar>
            <h1>Community Chart</h1>
            <div className='flex flex-col items-center'>

                <BigGraph></BigGraph>

            </div>
        </>
    )
}

export default page