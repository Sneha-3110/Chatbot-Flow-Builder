import React from 'react';

const onDragStart = (event, nodeType) => {
  event.dataTransfer.setData('application/reactflow', nodeType);
  event.dataTransfer.effectAllowed = 'move';
};

function NodesPanel() {
  return (
    <div className="nodes-panel">
      <h3>Nodes Panel</h3>
      <div
        className="draggable-node"
        onDragStart={(event) => onDragStart(event, 'textNode')}
        draggable
      >
        <span>✉️ Message</span>
      </div>
    </div>
  );
}

export default NodesPanel;