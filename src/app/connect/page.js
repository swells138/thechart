import React from 'react'
import Navbar from '../components/Navbar'
import MyGraph from '../components/MyGraph'
const page = () => {

    return (
        <>
            <Navbar></Navbar>
            <div className='flex flex-col items-center'>
                <h1>Something will go here</h1>
                <MyGraph></MyGraph>
            </div>
        </>

    )
}

export default page