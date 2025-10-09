// SettingsPanel: Panel for editing selected node's properties
import React from "react";

// Type definitions for node and flow
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

interface FlowType {
    nodes: NodeData[];
    edges: any[];
}

interface SettingsPanelProps {
    node: NodeData | undefined;
    setFlow: React.Dispatch<React.SetStateAction<FlowType>>;
    onBack?: () => void;
}

const SettingsPanel: React.FC<SettingsPanelProps> = ({ node, setFlow, onBack }) => {
    // Hide panel if no node is selected
    if (!node) return null;
    return (
        <div className="flex-1 border-l border-neutral-300 bg-white">
            {/* Top navbar with back button and title */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-neutral-300 relative">
                <button className="text-neutral-700 font-bold px-2 py-1 rounded hover:bg-neutral-100 transition-colors z-10" onClick={onBack}>
                    &#8592;
                </button>
                <span className="text-base mx-auto absolute left-0 right-0 text-center pointer-events-none text-neutral-700">Message</span>
            </div>
            {/* Node text editing area */}
            <div className="p-4">
                <label className="block mb-2 text-sm text-neutral-500">Text</label>
                <textarea
                    className="border border-neutral-300 rounded px-2 py-1 w-full min-h-[80px] resize-vertical"
                    value={node.data.label}
                    onChange={e => {
                        setFlow((f: FlowType) => ({
                            ...f,
                            nodes: f.nodes.map((n: NodeData) =>
                                n.id === node.id ? { ...n, data: { ...n.data, label: e.target.value } } : n
                            )
                        }));
                    }}
                />
            </div>
        </div>
    );
};

export default SettingsPanel;
