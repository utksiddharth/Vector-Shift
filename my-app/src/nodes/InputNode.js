import React from 'react';
import { Handle, Position } from 'reactflow';

export default function InputNode({ data }) {
  return (
    <div style={{
      padding: '10px 20px',
      border: '2px solid #10b981',
      borderRadius: '8px',
      background: 'white',
      minWidth: '150px' 
    }}>     
      <div><strong>Input Node</strong></div>
      <input 
        placeholder="Input name..."
        style={{ width: '100%', marginTop: '5px' }}
      />
      <Handle type="source" position={Position.Right} />
    </div>
  );
}