import React, { useState, useCallback } from "react";
import ReactFlow, { addEdge, Background, Controls, MiniMap } from "reactflow";
import "reactflow/dist/style.css";
import TextNode from "../nodes/TextNode";
import InputNode from "../nodes/InputNode";
import OutputNode from "../nodes/OutputNode";
import LLMNode from "../nodes/LLMNode";

const nodeTypes = {
  textNode: TextNode,
  inputNode: InputNode,
  outputNode: OutputNode,
  llmNode: LLMNode,
};

export default function NodeEditor() {
  const [nodes, setNodes] = useState([
    { id: "1", type: "textNode", position: { x: 50, y: 50 }, data: {} },
    { id: "2", type: "inputNode", position: { x: 300, y: 50 }, data: {} },
    { id: "3", type: "outputNode", position: { x: 300, y: 300 }, data: {} },
    { id: "4", type: "llmNode", position: { x: 50, y: 300 }, data: {} },
  ]);

  const [edges, setEdges] = useState([]);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    []
  );

  const handleSubmit = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/pipelines/parse", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nodes, edges }),
      });
      const data = await res.json();
      alert(
        `Nodes: ${data.num_nodes}\nEdges: ${data.num_edges}\nIs DAG: ${data.is_dag}`
      );
    } catch (error) {
      alert("Error connecting to backend: " + error.message);
    }
  };

  return (
    <div style={{ width: "100vw", height: "100vh", position: "relative" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
      >
        <Background />
        <Controls />
        <MiniMap />
      </ReactFlow>
      <button
        style={{
          position: "absolute",
          bottom: "20px",
          right: "20px",
          padding: "10px 20px",
          background: "#1d4ed8",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          fontSize: "16px",
          fontWeight: "bold",
          zIndex: 1000,
        }}
        onClick={handleSubmit}
      >
        Submit
      </button>
    </div>
  );
}    