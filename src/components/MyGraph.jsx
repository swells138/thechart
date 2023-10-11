"use client"
import { SigmaContainer } from "@react-sigma/core";
import "@react-sigma/core/lib/react-sigma.min.css";
import Graph from "graphology";
import { useLoadGraph, SearchControl, ControlsContainer, useRegisterEvents } from "@react-sigma/core";
import { useEffect, useState  } from "react";

const MyGraph = ({ sendNode }) => {
const [node, setNode] = useState(1)

const onNodeClick = (node) => {
  setNode(node)
  sendNode(node)
};

  const LoadGraph = ({  onNodeClick  }) => {

    const [nodeData, setNodeData] = useState({nodeDataArray:[], connectionArray:[]})
    
    const loadGraph = useLoadGraph();
    const graph = new Graph();
    const registerEvents = useRegisterEvents();
    
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
    
          console.log(nodeData, 'fetching nodes');
          console.log(connectionData, 'fetching connections');
    
          setNodeData(prev => ({
            ...prev,
            nodeDataArray: nodeData,
            connectionArray: connectionData
          }));
        } catch (error) {
          console.error('Error:', error);
        }
      };
    
      fetchData();
    }, [registerEvents]);
    

    nodeData.nodeDataArray.map((person) => graph.addNode(person.id, {
      x: Math.random(),
      y: Math.random(),
      size: 15,
      label: person.name,
      color: "#" + ((1 << 24) * Math.random() | 0).toString(16).padStart(6, "0")
    }));

    nodeData.connectionArray.map((connection) => {
      graph.addEdgeWithKey(
        connection.id.toString(),
        connection.personOne.toString(),
        connection.personTwo.toString()
        );
    });

loadGraph(graph);

  };

  return (
    <>
      <div>
        <SigmaContainer style={{ height: "600px", width: "850px" }}>
          <ControlsContainer position={"top-right"}>
            <SearchControl style={{ width: "200px" }} />
          </ControlsContainer>
          <LoadGraph  onNodeClick={onNodeClick} ></LoadGraph>
        </SigmaContainer>
      </div>
    </>
  );
};

export default MyGraph
