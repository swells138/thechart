"use client"
import { useEffect } from "react";
import Graph from "graphology";
import { SigmaContainer, useLoadGraph } from "@react-sigma/core";
import "@react-sigma/core/lib/react-sigma.min.css";

const LoadGraph = ({relationships, connections}) => {
  const loadGraph = useLoadGraph();

  useEffect(() => {
    const graph = new Graph();

    relationships.map((person) => graph.addNode(person.id, { 
    x: person.x,
    y: person.y,
    size: person.size, 
    label: person.name, 
    color: "#FA4F40" }));

    connections.map((connection) =>  graph.addEdgeWithKey(connection.id, connection.you, connection.them) )  
   
    loadGraph(graph);
  
  }, [loadGraph]);

  return null;
};

const MyGraph = ({data, rel}) => {

  return (
    <>
    <SigmaContainer style={{ height: "800px", width: "800px" }}>
      <LoadGraph relationships={data} connections={rel}/>
    </SigmaContainer>
    </>
  );
};

export default  MyGraph
