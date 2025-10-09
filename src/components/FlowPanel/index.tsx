
// FlowPanel: Main flow builder panel using React Flow
import { Background, Controls, ReactFlow, Handle, Position, useViewport, applyNodeChanges, useReactFlow } from "@xyflow/react";
import React, { useCallback } from "react";


// Type definitions for nodes, edges, and flow state
interface NodeData {
    id: string;
    type: string;
    position: { x: number; y: number };
    data: {
        label: string;
        icon?: string;
    };
    [key: string]: any;
}

interface EdgeData {
    id: string;
    source: string;
    target: string;
}

interface FlowType {
    nodes: NodeData[];
    edges: EdgeData[];
}

interface FlowPanelProps {
    flow: FlowType;
    setFlow: React.Dispatch<React.SetStateAction<FlowType>>;
    setSelectedNode: React.Dispatch<React.SetStateAction<string | null>>;
}


// Custom node component for message nodes
const MessageNode = ({ data, selected, dragging }: { data: { label: string; icon?: string }, selected?: boolean, dragging?: boolean }) => (
    <div className={`bg-white rounded-lg min-w-[280px] aspect-[7/2] flex flex-col overflow-hidden shadow-[0_0_20px_10px_rgba(0,0,0,0.1)] ring-2 ${selected && !dragging ? 'ring-primary' : 'ring-transparent'}`}>
        {/* Incoming edge handle (left) */}
        <Handle type="target" position={Position.Left} />
        <div className="flex items-center gap-2 bg-node-tertiary py-2 px-3">
            {data.icon && <img src={data.icon} alt="icon" className="w-4 h-4" />}
            <span className="text-sm font-bold">Send Message</span>
        </div>
        <div className="bg-white py-2 px-3 flex-auto flex items-center">
            <span className="text-sm">{data.label}</span>
        </div>
        {/* Outgoing edge handle (right) */}
        <Handle type="source" position={Position.Right} />
    </div>
);


// Register custom node types for React Flow
const nodeTypes = {
    message: MessageNode
};


// Main FlowPanel component: handles node/edge rendering, drag/drop, selection, and connection logic
const FlowPanel: React.FC<FlowPanelProps> = ({ flow, setFlow, setSelectedNode }) => {
    const reactFlowInstance = useReactFlow();

    // Select node on click
    const onNodeClick = useCallback((_: any, node: any) => setSelectedNode(node.id), [setSelectedNode]);

    // Handle node drop from sidebar
    const onDrop = useCallback((event: React.DragEvent) => {
        event.preventDefault();
        let type = event.dataTransfer.getData("application/node-type");
        type = "message";
        const reactFlowBounds = event.currentTarget.getBoundingClientRect();
        const position = {
            x: event.clientX - reactFlowBounds.left,
            y: event.clientY - reactFlowBounds.top
        };
        const newNode: NodeData = {
            id: `${type}-${Date.now()}`,
            type,
            position,
            data: { label: `Message ${flow.nodes.length + 1}`, icon: "./message_node.png" }
        };
        setFlow(f => ({ ...f, nodes: [...f.nodes, newNode] }));
    }, [setFlow, flow.nodes.length]);

    // Render React Flow with custom logic for selection, connection, and node changes
    return (
        <div className="flex-3" style={{ height: '100vh' }} onDrop={onDrop} onDragOver={e => e.preventDefault()}>
            <ReactFlow
                nodes={flow.nodes.map(node => ({ ...node, draggable: true }))}
                edges={flow.edges}
                nodeTypes={nodeTypes}
                onNodeClick={onNodeClick}
                onNodeDragStart={() => {
                    setSelectedNode(null);
                    // Deselect all nodes in React Flow
                    reactFlowInstance.setNodes(nodes => nodes.map(n => ({ ...n, selected: false })));
                }}
                onPaneClick={() => setSelectedNode(null)}
                onConnect={({ source, target }) => {
                    // Restrict to only one outgoing edge per source node
                    const outgoing = flow.edges.filter(e => e.source === source);
                    if (outgoing.length > 0) {
                        // Prevent multiple outgoing edges from a node
                        return;
                    }
                    setFlow(f => ({
                        ...f,
                        edges: [...f.edges, { id: `${source}-${target}`, source, target }]
                    }));
                }}
                onNodesChange={changes => {
                    setFlow(f => ({
                        ...f,
                        nodes: applyNodeChanges(changes, f.nodes)
                    }));
                }}
            >
                {/* Background grid and controls for flow editing */}
                <Background />
                <Controls />
            </ReactFlow>
        </div>
    );
}

export default FlowPanel;