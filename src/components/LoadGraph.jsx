import React from "react";
import "@react-sigma/core/lib/react-sigma.min.css";
import Graph from "graphology";
import { forceSimulation, forceLink, forceManyBody, forceCenter } from "d3-force";
import { useLoadGraph, useRegisterEvents, useSigma } from "@react-sigma/core";
import { useEffect, useState, useMemo } from "react";

const LoadGraph = ({ onNodeClick }) => {
  const [nodeData, setNodeData] = useState({ nodeDataArray: [], connectionArray: [] });
  const [draggedNode, setDraggedNode] = useState();
  const loadGraph = useLoadGraph();
  const sigma = useSigma();
  const graph = useMemo(() => new Graph(), []); // Memoize the graph instance
  const registerEvents = useRegisterEvents();

  useEffect(() => {
    registerEvents({
      doubleClickNode: (event) => {
        event.preventSigmaDefault();
        onNodeClick(event.node);
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
    });
  }, [registerEvents, sigma, draggedNode, onNodeClick]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const nodeResponse = await fetch(`http://localhost:3000/api/usersconnections`);

        if (!nodeResponse.ok) {
          throw new Error(`HTTP error! status: ${nodeResponse.status}`);
        }

        const nodeData = await nodeResponse.json();

        setNodeData((prev) => ({
          ...prev,
          nodeDataArray: nodeData.users,
          connectionArray: nodeData.connections,
        }));
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    nodeData.nodeDataArray.forEach((person) => {
      graph.addNode(person.id.toString(), {
        x: Math.random(),
        y: Math.random(),
        size: 15,
        label: person.firstName,
        color: person.color,
      });
    });

    nodeData.connectionArray.forEach((connection) => {
      graph.addEdgeWithKey(
        connection.id.toString(),
        connection.personOne.toString(),
        connection.personTwo.toString()
      );
    });

    const transformedNodes = nodeData.nodeDataArray.map((node) => ({
      ...node,
      id: node.id.toString(),
    }));
    const transformedConnections = nodeData.connectionArray.map((connection) => ({
      ...connection,
      source: connection.personOne.toString(),
      target: connection.personTwo.toString(),
    }));

    const simulation = forceSimulation(transformedNodes)
      .force(
        "link",
        forceLink(transformedConnections).id((d) => d.id)
      )
      .force("charge", forceManyBody())
      .force("center", forceCenter(450, 300)); // Adjust to match the dimensions of your Sigma container

    simulation.on("tick", () => {
      sigma.getGraph().forEachNode((node, attributes) => {
        const d3Node = transformedNodes.find((d) => d.id === node);
        sigma.getGraph().setNodeAttribute(node, "x", d3Node.x);
        sigma.getGraph().setNodeAttribute(node, "y", d3Node.y);
      });
    });

    loadGraph(graph);

    return () => {
      graph.clear();
      simulation.stop();
    };
  }, [nodeData, loadGraph, graph, sigma]);
  return null;
};

export default LoadGraph;
