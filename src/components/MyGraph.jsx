"use client"
import { SigmaContainer } from "@react-sigma/core";
import "@react-sigma/core/lib/react-sigma.min.css";
import Graph from "graphology";
import { useLoadGraph, SearchControl, ControlsContainer, useRegisterEvents } from "@react-sigma/core";
import { useEffect, useState  } from "react";

const MyGraph = ({ data, rel }) => {
const [node, setNode] = useState(1)
console.log(node)

const onNodeClick = (node) => {
  setNode(node)
  };

  const LoadGraph = ({ relationships, connections, onNodeClick  }) => {
   
    const loadGraph = useLoadGraph();
    const graph = new Graph();
    const registerEvents = useRegisterEvents();

  
    useEffect(()=>{
      registerEvents({
        clickNode: (event) => {
          onNodeClick(event.node)
        } 
      })
    },[registerEvents])

    relationships.map((person) => graph.addNode(person.id, {
      x: Math.random(),
      y: Math.random(),
      size: 15,
      label: person.name,
      color: "#" + ((1 << 24) * Math.random() | 0).toString(16).padStart(6, "0")
    }));

    connections.map((connection) =>
      graph.addEdgeWithKey(connection.id.toString(),
        connection.personOne, connection.personTwo))

    loadGraph(graph);

  };

  return (
    <>
      <div>
        <SigmaContainer style={{ height: "600px", width: "850px" }}>
          <ControlsContainer position={"top-right"}>
            <SearchControl style={{ width: "200px" }} />
          </ControlsContainer>
          <LoadGraph relationships={data} connections={rel} onNodeClick={onNodeClick} ></LoadGraph>
        </SigmaContainer>
      </div>
    </>
  );
};

export default MyGraph
