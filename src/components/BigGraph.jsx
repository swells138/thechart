"use client"
import React, { useEffect, useState } from "react";
import "@react-sigma/core/lib/react-sigma.min.css";
import { MultiDirectedGraph } from "graphology";
import {
    SigmaContainer,
    ControlsContainer,
    ZoomControl,
    SearchControl,
    FullScreenControl,
} from "@react-sigma/core";

const LoadGraphWithByProp = () => {
    const [nodeData, setNodeData] = useState({ nodeDataArray: [], connectionArray: [] });

    useEffect(() => {

        const fetchData = async () => {
            try {
                const [nodeResponse, connectionResponse] = await Promise.all([
                    fetch(`http://localhost:3000/api/node`),
                    fetch(`http://localhost:3000/api/connection`)
                ]);

                if (!nodeResponse.ok || !connectionResponse.ok) {
                    throw new Error(`HTTP error! status: ${nodeResponse.status} or ${connectionResponse.status}`);
                }

                const [nodeData, connectionData] = await Promise.all([
                    nodeResponse.json(),
                    connectionResponse.json()
                ]);

                setNodeData({
                    nodeDataArray: nodeData,
                    connectionArray: connectionData
                });
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchData();

        return () => {

        };
    }, []);


    const graph = new MultiDirectedGraph();


    nodeData.nodeDataArray.forEach((person) => {
        graph.addNode(person.id.toString(), {
            x: Math.random(),
            y: Math.random(),
            size: 15,
            label: person.firstName,
            color: person.color
        });
    });

    nodeData.connectionArray.forEach((connection) => {
        graph.addEdgeWithKey(
            connection.id.toString(),
            connection.personOne.toString(),
            connection.personTwo.toString()
        );
    });

    return (
        <>
            <SigmaContainer style={{ height: "600px", width: "900px" }} graph={graph}>
                <ControlsContainer position={"top-right"}>
                    <SearchControl style={{ width: "200px" }} />
                </ControlsContainer>
                <ControlsContainer position={"bottom-right"}>
                    <ZoomControl />
                    <FullScreenControl />
                </ControlsContainer>
            </SigmaContainer>
        </>
    )
};

export default LoadGraphWithByProp;
