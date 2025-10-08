import { Background, Controls, ReactFlow } from "@xyflow/react";

const FlowPanel: React.FC = () => {
    return (
        <div className="flex-3">
            <ReactFlow
                fitView
            >
                <Background />
                <Controls />
            </ReactFlow>
        </div>
    )
}

export default FlowPanel;