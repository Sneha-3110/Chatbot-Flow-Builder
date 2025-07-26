import React from 'react';
import { Handle, Position } from 'reactflow';

function TextNode({ data, isConnectable }) {
  return (
    <div className="text-node">
      <Handle
        type="target"
        position={Position.Left}
        id="a"
        isConnectable={isConnectable}
      />
      <div className="node-header">
        <span>💬 Send Message</span>
      </div>
      <div className="node-body">
        <p>{data.label}</p>
      </div>
      <Handle
        type="source"
        position={Position.Right}
        id="b"
        isConnectable={isConnectable}
      />
    </div>
  );
}

export default TextNode;