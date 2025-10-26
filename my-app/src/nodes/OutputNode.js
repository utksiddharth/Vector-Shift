import React from 'react';
import { Handle, Position } from 'reactflow';

export default function OutputNode({ data }) {
  return (
    <div style={{
      padding: '10px 20px',
      border: '2px solid #ef4444',
      borderRadius: '8px',
      background: 'white',
      minWidth: '150px'
    }}>
      <Handle type="target" position={Position.Left} />
      <div><strong>Output Node</strong></div>
      <input 
        placeholder="Output name..."
        style={{ width: '100%', marginTop: '5px' }}
      />
    </div>
  );
}