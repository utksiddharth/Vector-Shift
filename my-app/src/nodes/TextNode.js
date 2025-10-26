import React from 'react';
import { Handle, Position } from 'reactflow';

export default function TextNode({ data }) {
  return (
    <div style={{
      padding: '10px 20px',
      border: '2px solid #1d4ed8',
      borderRadius: '8px',
      background: 'white',
      minWidth: '150px'
    }}>
      <Handle type="target" position={Position.Left} />
      <div><strong>Text Node</strong></div>
      <textarea 
        placeholder="Enter text..."
        style={{ width: '100%', marginTop: '5px' }}
      />
      <Handle type="source" position={Position.Right} />
    </div>
  );
}