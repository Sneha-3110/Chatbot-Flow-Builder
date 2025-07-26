import React, { useState, useRef, useCallback } from 'react';
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  Background,
} from 'reactflow';
import 'reactflow/dist/style.css';

import NodesPanel from './components/NodesPanel';
import Settings from './components/Settings';
import TextNode from './components/custom/TextNode';

import './index.css';

const initialNodes = [
  {
    id: '1',
    type: 'textNode',
    data: { label: 'Test Message 1' },
    position: { x: 250, y: 5 },
  },
];

const nodeTypes = {
  textNode: TextNode,
};

let id = 2; 
const getId = () => `${id++}`;

function App() {
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [selectedNode, setSelectedNode] = useState(null);
  const [saveStatus, setSaveStatus] = useState('');

  const onSelectionChange = useCallback(({ nodes }) => {
    if (nodes.length === 1) {
      setSelectedNode(nodes[0]);
    } else {
      setSelectedNode(null);
    }
  }, []);

  const updateNodeText = (nodeId, newText) => {
    setNodes((currentNodes) =>
      currentNodes.map((node) => {
        if (node.id === nodeId) {
          return {
            ...node,
            data: {
              ...node.data,
              label: newText,
            },
          };
        }
        return node;
      })
    );
  };
  
  const onConnect = useCallback((params) => {
    setEdges((eds) => {
        const sourceHandleHasConnection = eds.some(
            (edge) => edge.source === params.source && edge.sourceHandle === params.sourceHandle
        );
        if (sourceHandleHasConnection) {
            console.warn("Error: Source handle can only have one outgoing connection.");
            return eds; 
        }
        return addEdge(params, eds);
    });
  }, [setEdges]);

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();
      const type = event.dataTransfer.getData('application/reactflow');

      if (typeof type === 'undefined' || !type) {
        return;
      }
      
      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      const newNode = {
        id: getId(),
        type,
        position,
        data: { label: `text message ${id-1}` },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance, setNodes]
  );

  const onSave = useCallback(() => {
    if (nodes.length > 1) {
      const targetNodeIds = new Set(edges.map((edge) => edge.target));
      const nodesWithEmptyTargets = nodes.filter(
        (node) => !targetNodeIds.has(node.id)
      );

      if (nodesWithEmptyTargets.length > 1) {
        setSaveStatus('error');
        setTimeout(() => setSaveStatus(''), 2000);
        return;
      }
    }
    
    setSaveStatus('success');
    console.log('Flow saved:', { nodes, edges });
    setTimeout(() => setSaveStatus(''), 2000);
  }, [nodes, edges]);

  return (
    <div className="app-container">
      <ReactFlowProvider>
        <div className="reactflow-wrapper" ref={reactFlowWrapper}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onInit={setReactFlowInstance}
            onDrop={onDrop}
            onDragOver={onDragOver}
            onSelectionChange={onSelectionChange}
            nodeTypes={nodeTypes}
            fitView
          >
            <Background />
            <Controls />
          </ReactFlow>
        </div>
        <div className="sidebar">
          {selectedNode ? (
            <Settings
              node={selectedNode}
              updateNodeText={updateNodeText}
              onBack={() => setSelectedNode(null)}
            />
          ) : (
            <NodesPanel />
          )}
        </div>
      </ReactFlowProvider>
      <div className="top-bar">
         {saveStatus === 'error' && (
            <div className="notification error">Cannot save Flow</div>
         )}
         {saveStatus === 'success' && (
            <div className="notification success">Flow Saved!</div>
         )}
        <button onClick={onSave} className="save-button">
          Save Changes
        </button>
      </div>
    </div>
  );
}

export default App;