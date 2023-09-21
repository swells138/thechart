import React from 'react'
import Navbar from '../components/Navbar'
import MyGraph from '../components/MyGraph'

const page = () => {
    const nodeInfo = [{
        name: "Sydney",
        x: 0,
        y: 0,
        id: "A",
        size: 15,
        color: "#FA4F40"
    },
    {
        name: "Holly",
        x: 1,
        y: 1,
        id: "B",
        size: 15,
        color: "#FA4F40"
    },
    {
        name: "Eddy",
        x: 1,
        y: 2,
        id: "C",
        size: 15,
        color: "#FA4F40"
    }
    ]

    const relInfo = [{
        id: "001",
        you: "A",
        them: "B"
    },
    {
        id: "002",
        you: "A",
        them: "C"
    }
    ]

    return (
        <>
            <Navbar></Navbar>
            <div className='flex flex-col items-center'>
                <MyGraph data={nodeInfo} rel={relInfo}></MyGraph>
            </div>
        </>

    )
}

export default page