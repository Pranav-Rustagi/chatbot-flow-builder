
// FlowPanel: Main flow builder panel using React Flow

import { Background, ReactFlow, Handle, Position, addEdge, MarkerType, type Connection } from "@xyflow/react";
import { useCallback, useMemo } from "react";


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

type FlowPanelProps = {
    nodes: NodeData[];
    setNodes: React.Dispatch<React.SetStateAction<NodeData[]>>;
    onNodesChange: (changes: any) => void;
    edges: EdgeData[];
    setEdges: React.Dispatch<React.SetStateAction<EdgeData[]>>;
    onEdgesChange: (changes: any) => void;
    setSelectedNode: React.Dispatch<React.SetStateAction<string | null>>;
};


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

const FlowPanel: React.FC<FlowPanelProps> = ({ nodes, setNodes, onNodesChange, edges, setEdges, onEdgesChange, setSelectedNode }) => {

    // Register custom node types for React Flow
    const nodeTypes = useMemo(() => ({
        message: MessageNode
    }), []);

    // Handle node drop from sidebar
    const onDrop = useCallback((event: React.DragEvent<HTMLDivElement>) => {
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
        setNodes((nds: NodeData[]) => [...nds, newNode]);
    }, [setNodes]);

    // Handle edge connection (only one outgoing edge per source)

    const onConnect = useCallback((params: Connection) => {
        const outgoing = edges.filter(e => e.source === params.source);
        if (outgoing.length > 0) return;
        setEdges((eds) =>
            addEdge(params, eds).map(edge => ({
                ...edge,
                markerEnd: {
                    type: MarkerType.ArrowClosed,
                    width: 24,
                    height: 24
                }
            }))
        );
    }, [edges, setEdges]);

    // Select node on click
    const onNodeClick = useCallback((_: unknown, node: NodeData) => setSelectedNode(node.id), [setSelectedNode]);

    return (
        <div className="flex-3" style={{ height: '100vh' }} onDrop={onDrop} onDragOver={e => e.preventDefault()}>
            <ReactFlow
                nodes={nodes.map(node => ({ ...node, draggable: true }))}
                edges={edges}
                nodeTypes={nodeTypes}
                onNodeClick={onNodeClick}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                onPaneClick={() => setSelectedNode(null)}
                onNodesDelete={() => setSelectedNode(null)}
            >
                <Background />
            </ReactFlow>
        </div>
    );
}

export default FlowPanel;