import React from 'react'
import "@react-sigma/core/lib/react-sigma.min.css";
import Graph from "graphology";
import { useLoadGraph, useRegisterEvents } from "@react-sigma/core";
import { useEffect, useState } from "react";

const LoadGraph = ({ onNodeClick }) => {
  const [nodeData, setNodeData] = useState({ nodeDataArray: [], connectionArray: [] })

  const loadGraph = useLoadGraph();
  const graph = new Graph();
  const registerEvents = useRegisterEvents();

  useEffect(() => {
    registerEvents({
      clickNode: (event) => {
        event.preventSigmaDefault()
        onNodeClick(event.node)
      }
    })

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
  }, []);


  nodeData.nodeDataArray.map((person) => graph.addNode(person.id, {
    x: Math.random(),
    y: Math.random(),
    size: 15,
    label: person.firstName,
    color: person.color
  }));
  console.log(nodeData.nodeDataArray)

  nodeData.connectionArray.map((connection) => {
    graph.addEdgeWithKey(
      connection.id.toString(),
      connection.personOne.toString(),
      connection.personTwo.toString()
    );
  });

  loadGraph(graph);

};


export default LoadGraph