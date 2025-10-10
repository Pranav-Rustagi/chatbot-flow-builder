
// FlowPanel: Main flow builder panel using React Flow
import { Background, ReactFlow, Handle, Position, applyNodeChanges, useReactFlow, MarkerType, applyEdgeChanges } from "@xyflow/react";
import React, { useCallback, useEffect, useMemo } from "react";


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


// Main FlowPanel component: handles node/edge rendering, drag/drop, selection, and connection logic
const FlowPanel: React.FC<FlowPanelProps> = ({ flow, setFlow, setSelectedNode }) => {
    const reactFlowInstance = useReactFlow();

    // Register custom node types for React Flow
    const nodeTypes = useMemo(() => ({
        message: MessageNode
    }), [MessageNode]);

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
            data: { label: `Sample message`, icon: "./message_node.png" }
        };
        setFlow(f => ({ ...f, nodes: [...f.nodes, newNode] }));
    }, [setFlow, flow.nodes.length]);

    // Render React Flow with custom logic for selection, connection, and node changes
    // Add arrow marker to edges for flow direction
    const edgesWithArrow = flow.edges.map(edge => ({
        ...edge,
        markerEnd: {
            type: MarkerType.ArrowClosed,
            width: 24,
            height: 24
        }
    }));


    // Load flow from localStorage on initial mount
    useEffect(() => {
        const savedFlow = localStorage.getItem('chatbot-flow');
        if (savedFlow) {
            try {
                setFlow(JSON.parse(savedFlow));
                reactFlowInstance.fitView({ maxZoom: 0.8 });
            } catch { }
        }
    }, []);

    return (
        <div className="flex-3" style={{ height: '100vh' }} onDrop={onDrop} onDragOver={e => e.preventDefault()}>
            <ReactFlow
                nodes={flow.nodes.map(node => ({ ...node, draggable: true }))}
                edges={edgesWithArrow}
                nodeTypes={nodeTypes}
                onNodeClick={onNodeClick}
                onNodeDragStart={() => {
                    setSelectedNode(null);
                    reactFlowInstance.setNodes(nodes => nodes.map(n => ({ ...n, selected: false })));
                }}
                onPaneClick={() => setSelectedNode(null)}
                onConnect={({ source, target }) => {
                    const outgoing = flow.edges.filter(e => e.source === source);
                    if (outgoing.length > 0) {
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

                    if (changes[0].type === "remove") {
                        setSelectedNode(null);

                        const nodeId = changes[0].id;

                        setFlow(f => ({
                            ...f,
                            edges: f.edges.filter(edge => edge.source !== nodeId && edge.target !== nodeId)
                        }));
                    }
                }}
                onEdgesChange={changes => {
                    console.log(changes);
                }}
            >
                <Background />
            </ReactFlow>
        </div>
    );
}

export default FlowPanel;