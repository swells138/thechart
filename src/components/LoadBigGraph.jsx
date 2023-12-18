import React, { useEffect, useState, useMemo } from "react";
import "@react-sigma/core/lib/react-sigma.min.css";
import Graph from "graphology";
import { forceSimulation, forceLink, forceManyBody, forceCenter } from "d3-force";
import { useLoadGraph, useRegisterEvents, useSigma } from "@react-sigma/core";

const LoadBigGraph = ({ onNodeClick }) => {
  const [nodeData, setNodeData] = useState({ nodeDataArray: [], connectionArray: [] });
  const loadGraph = useLoadGraph();
  const graph = useMemo(() => new Graph(), []);
  const registerEvents = useRegisterEvents();
  const sigma = useSigma();
  const [draggedNode, setDraggedNode] = useState();

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
          nodeDataArray: nodeData.map(node => ({ ...node, id: node.id.toString() })),
          connectionArray: connectionData.map(connection => ({
            ...connection,
            source: connection.personOne.toString(),
            target: connection.personTwo.toString()
          }))
        });
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    registerEvents({
      doubleClickNode: (event) => {
        event.preventSigmaDefault()
        onNodeClick(event.node)
      },
      downNode: (e) => {
        setDraggedNode(e.node);
        sigma.getGraph().setNodeAttribute(e.node, "highlighted", true);
      },
      mouseup: (e) => {
        if (draggedNode) {
          setDraggedNode(null);
          sigma.getGraph().removeNodeAttribute(draggedNode, "highlighted");
        }
      },
      mousedown: (e) => {
        // Disable the autoscale at the first down interaction
        if (!sigma.getCustomBBox()) sigma.setCustomBBox(sigma.getBBox());
      },
      mousemove: (e) => {
        if (draggedNode) {
          // Get new position of node
          const pos = sigma.viewportToGraph(e);
          sigma.getGraph().setNodeAttribute(draggedNode, "x", pos.x);
          sigma.getGraph().setNodeAttribute(draggedNode, "y", pos.y);

          // Prevent sigma to move camera:
          e.preventSigmaDefault();
          e.original.preventDefault();
          e.original.stopPropagation();
        }
      },
      touchup: (e) => {
        if (draggedNode) {
          setDraggedNode(null);
          sigma.getGraph().removeNodeAttribute(draggedNode, "highlighted");
        }
      },
      touchdown: (e) => {
        // Disable the autoscale at the first down interaction
        if (!sigma.getCustomBBox()) sigma.setCustomBBox(sigma.getBBox());
      },
      touchmove: (e) => {
        if (draggedNode) {
          // Get new position of node
          const pos = sigma.viewportToGraph(e);
          sigma.getGraph().setNodeAttribute(draggedNode, "x", pos.x);
          sigma.getGraph().setNodeAttribute(draggedNode, "y", pos.y);

          // Prevent sigma to move camera:
          e.preventSigmaDefault();
          e.original.preventDefault();
          e.original.stopPropagation();
        }
      },
    })
  }, [registerEvents, sigma, draggedNode]);

  useEffect(() => {
    nodeData.nodeDataArray.forEach((person) => {
      graph.addNode(person.id.toString(), {
        x: Math.random(),
        y: Math.random(),
        size: 15,
        label: person.firstName + ' ' + person.lastName,
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

    const simulation = forceSimulation(nodeData.nodeDataArray)
      .force("link", forceLink(nodeData.connectionArray).id(d => d.id))
      .force("charge", forceManyBody())
      .force("center", forceCenter(450, 300)); // Assuming your container is 900x600

    simulation.on("tick", () => {
      sigma.getGraph().forEachNode((node, attributes) => {
        const d3Node = nodeData.nodeDataArray.find(d => d.id === node);
        sigma.getGraph().setNodeAttribute(node, "x", d3Node.x);
        sigma.getGraph().setNodeAttribute(node, "y", d3Node.y);
      });
    });

    loadGraph(graph);

    return () => {
      graph.clear();
      simulation.stop();
    };
  }, [nodeData, loadGraph, graph]);

  return null;
};

export default LoadBigGraph;
