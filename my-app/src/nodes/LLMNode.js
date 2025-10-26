import React from 'react';
import { Handle, Position } from 'reactflow';

export default function LLMNode({ data }) {
  return (
    <div style={{
      padding: '10px 20px',
      border: '2px solid #8b5cf6',
      borderRadius: '8px',
      background: 'white',
      minWidth: '150px'
    }}>
      <Handle type="target" position={Position.Left} />
      <div><strong>LLM Node</strong></div>
      <div style={{ fontSize: '12px', color: '#666', marginTop: '5px' }}>
        Language Model
      </div>
      <Handle type="source" position={Position.Right} />
    </div>
  );
}