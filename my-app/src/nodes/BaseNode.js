import React from "react";
import { Handle, Position } from "reactflow";

const BaseNode = ({ data, type, inputs = [], outputs = [], children }) => {
  return (
    <div
      style={{
        padding: "10px",
        background: "#fff",
        border: "1px solid #ccc",
        borderRadius: "8px",
        width: "200px",
        minHeight: "50px",
        boxShadow: "2px 2px 5px rgba(0,0,0,0.1)",
      }}
    >
      <strong>{type}</strong>
      {children}
      {outputs.map((o) => (
        <Handle key={o} type="source" position={Position.Right} id={o} />
      ))}
    </div>
  );
};
export default BaseNode;        
    