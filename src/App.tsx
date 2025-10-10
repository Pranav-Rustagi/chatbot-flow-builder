
// Import global styles and required components
import '@xyflow/react/dist/style.css';
import './index.css';
import NavBar from './components/NavBar';
import FlowPanel from './components/FlowPanel';
import SideBar from './components/SideBar';
import SettingsPanel from './components/SettingsPanel/SettingsPanel';
import React, { useState, useEffect } from 'react';
import { ReactFlowProvider } from '@xyflow/react';


// Type definitions for nodes and edges in the flow
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

const App: React.FC = () => {
    // State for currently selected node in the flow
    const [selectedNode, setSelectedNode] = useState<string | null>(null);
    // State for toast message and its visibility/type
    const [toastMessage, setToastMessage] = useState<string | null>(null);
    const [showToast, setShowToast] = useState(false);
    const [toastType, setToastType] = useState<'error' | 'success'>('error');
    // State for the flow (nodes and edges)
    const [flow, setFlow] = useState<FlowType>({ nodes: [], edges: [] });

    // Save handler: validates flow and persists to localStorage
    const handleSave = () => {
        // Validation: more than one node, and more than one node with empty targets
        const nodesWithNoTargets = flow.nodes.filter(
            node => !flow.edges.some(edge => edge.source === node.id)
        );
        if (flow.nodes.length > 1 && nodesWithNoTargets.length > 1) {
            setToastMessage("Cannot save Flow");
            setToastType('error');
            setShowToast(true);
            setTimeout(() => setShowToast(false), 3000);
        } else {
            // Save flow state to localStorage
            localStorage.setItem('chatbot-flow', JSON.stringify(flow));
            setToastMessage("Saved successfully!");
            setToastType('success');
            setShowToast(true);
            setTimeout(() => setShowToast(false), 3000);
        }
    };

    return (
        <ReactFlowProvider>
            <div className='flex flex-col h-full'>
                <NavBar onSave={handleSave} />
                {showToast && toastMessage && (
                    <div className={`fixed top-6 left-1/2 transform -translate-x-1/2 z-50 px-6 py-3 rounded shadow-lg animate-fade-in text-black ${toastType === 'error' ? 'bg-error' : 'bg-success'}`}>
                        {toastMessage}
                    </div>
                )}
                <div className="flex flex-auto">
                    <FlowPanel
                        flow={flow}
                        setFlow={setFlow}
                        setSelectedNode={setSelectedNode}
                    />
                    {selectedNode ? (
                        <SettingsPanel
                            node={flow.nodes.find(n => n.id === selectedNode)}
                            setFlow={setFlow}
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
