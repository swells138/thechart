"use client"
import React, { useState } from "react";
import "@react-sigma/core/lib/react-sigma.min.css";
import LoadBigGraph from "../components/LoadBigGraph"
import eddy from "../../public/eddy.jpg"
import {
    SigmaContainer,
    ControlsContainer,
    ZoomControl,
    SearchControl,
    FullScreenControl
} from "@react-sigma/core";
import { Avatar, Typography } from "@mui/material";

const BigGraph = () => {
    const [state, setState] = useState({
        person: false,
    });
    const [nodeList, setNodeList] = useState({ singleNode: {} })


    function handleNodeSend(event) {
        fetch(`http://localhost:3000/api/node/${event}`).then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
            .then(data => {
                setNodeList((prev) => {
                    let nd = { ...prev }
                    nd.singleNode = data
                    return nd
                })
                setState((prev) => {
                    let nd = { ...prev }
                    nd.person = true
                    return nd
                })
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

    return (
        <>
            <div>
                <div className="flex items-center mx-2">
                    <div className="flex flex-col px-2">
                        <Typography variant="h2">Our</Typography>
                        <Typography variant="h2">Chart</Typography>
                    </div>
                    <div>
                        <SigmaContainer style={{ height: "600px", width: "900px" }}>
                            <ControlsContainer position={"top-right"}>
                                <SearchControl style={{ width: "200px" }} />
                            </ControlsContainer>
                            <ControlsContainer position={"bottom-right"}>
                                <ZoomControl />
                                <FullScreenControl />
                            </ControlsContainer>
                            <LoadBigGraph
                                onNodeClick={handleNodeSend}
                            ></LoadBigGraph>
                        </SigmaContainer>
                    </div>
                    <div className="flex flex-col px-2">
                        <div className='flex flex-col p-5'>
                            {state.person && (
                                <div>
                                    <Avatar src={eddy} alt={nodeList.singleNode.firstName}></Avatar>
                                    <h1 className='text-2xl'>{nodeList.singleNode.firstName} {nodeList.singleNode.lastName}</h1>
                                    <p>Age: {nodeList.singleNode.age}</p>
                                    <p>Location: {nodeList.singleNode.city} {nodeList.singleNode.state}</p>
                                    <div>
                                        {/* <Button className='py-1' color='secondary'>Edit</Button>
                                                    <Button color="secondary">Delete</Button> */}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
};

export default BigGraph;
