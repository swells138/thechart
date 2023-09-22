"use client"
import { SigmaContainer } from "@react-sigma/core";
import "@react-sigma/core/lib/react-sigma.min.css";
import Graph from "graphology";
import { useLoadGraph } from "@react-sigma/core";


const MyGraph = ({data, rel}) => {

  const LoadGraph = ({relationships, connections})=>  {
    const loadGraph = useLoadGraph();
    const graph = new Graph();
    
        relationships.map((person) => graph.addNode(person.id, { 
        x: Math.random(),
        y: Math.random(),
        size: 10, 
        label: person.name, 
        color: "#" + ((1 << 24) * Math.random() | 0).toString(16).padStart(6, "0") }));

        connections.map((connection) => 
        graph.addEdgeWithKey(connection.id.toString(), 
        connection.personOne, connection.personTwo) )  
      
        loadGraph(graph);

  };

  return (
    <>
    <SigmaContainer style={{ height: "800px", width: "800px" }}>
      <LoadGraph relationships={data} connections={rel}/>
    </SigmaContainer>
    </>
  );
};

export default  MyGraph
