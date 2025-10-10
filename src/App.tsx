
// Import global styles and required components
import '@xyflow/react/dist/style.css';
import './index.css';
import NavBar from './components/NavBar';
import FlowPanel from './components/FlowPanel';
import SideBar from './components/SideBar';
import SettingsPanel from './components/SettingsPanel/SettingsPanel';
import React, { useState, useEffect } from 'react';
import { ReactFlowProvider, useEdgesState, useNodesState } from '@xyflow/react';


// Type definitions for nodes and edges in the flow
interface NodeData {
    id: string;
    type: string;
    position: { x: number; y: number };
    data: {
        label: string;
        icon?: string;
    };
    // [key: string]: any;
}

interface EdgeData {
    id: string;
    source: string;
    target: string;
}

const App: React.FC = () => {
    // State for currently selected node in the flow
    const [selectedNode, setSelectedNode] = useState<string | null>(null);

    // State for toast message and its visibility/type
    const [toastMessage, setToastMessage] = useState<string | null>(null);
    const [toastType, setToastType] = useState<'error' | 'success'>('error');

    // State for the flow (nodes and edges)
    const [nodes, setNodes, onNodesChange] = useNodesState<NodeData & { draggable?: true }>([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState<(EdgeData & { markerEnd?: any })>([]);

    // Save handler: validates flow and persists to localStorage
    const handleSave = () => {
        // Validation: more than one node, and more than one node with empty targets
        const nodesWithNoTargets = nodes.filter(
            node => !edges.some(edge => edge.source === node.id)
        );
        if (nodes.length > 1 && nodesWithNoTargets.length > 1) {
            setToastMessage("Cannot save Flow");
            setToastType('error');
        } else {
            // Save flow state to localStorage
            const flow = {
                nodes: [...nodes].map((({ id, type, position, data }) => ({
                    id, type, position, data
                }))),
                edges: [...edges].map(({id, source, target}) => ({
                    id, source, target
                }))
            };

            localStorage.setItem('chatbot-flow', JSON.stringify(flow));
            setToastMessage("Saved successfully!");
            setToastType('success');
        }
    };

    useEffect(() => {
        let timeoutVar: number;
        if (toastMessage !== null) {
            timeoutVar = setTimeout(() => {
                setToastMessage(null);
            }, 3000);
        }

        return () => clearTimeout(timeoutVar);
    }, [toastMessage]);

    useEffect(() => {
        const savedFlow = localStorage.getItem('chatbot-flow');
        if (savedFlow) {
            try {
                const flow = JSON.parse(savedFlow);

                const nodes = (flow.nodes || []).map((node: NodeData) => ({ 
                    ...node, 
                    draggable: true 
                }));

                const edges = (flow.edges || []).map((edge: EdgeData) => ({
                    ...edge,
                    markerEnd: {
                        type: 'arrowclosed',
                        width: 24,
                        height: 24
                    }
                }));


                setNodes(nodes);
                setEdges(edges);

            } catch {
                console.error("Failed to parse saved flow from localStorage");
            }
        }
    }, [setNodes, setEdges]);

    return (
        <ReactFlowProvider>
            <div className='flex flex-col h-full'>
                <NavBar onSave={handleSave} />
                {toastMessage != null && (
                    <div className={`fixed top-6 left-1/2 transform -translate-x-1/2 z-50 px-6 py-3 rounded shadow-lg animate-fade-in text-black ${toastType === 'error' ? 'bg-error' : 'bg-success'}`}>
                        {toastMessage}
                    </div>
                )}
                <div className="flex flex-auto">
                    <FlowPanel
                        nodes={nodes}
                        setNodes={setNodes}
                        onNodesChange={onNodesChange}
                        edges={edges}
                        setEdges={setEdges}
                        onEdgesChange={onEdgesChange}
                        setSelectedNode={setSelectedNode}
                    />
                    {selectedNode ? (
                        <SettingsPanel
                            node={nodes.find(n => n.id === selectedNode)}
                            setNodes={setNodes}
                            onBack={() => setSelectedNode(null)}
                        />
                    ) : (
                        <SideBar />
                    )}
                </div>
            </div>
        </ReactFlowProvider>
    );
}

export default App;
