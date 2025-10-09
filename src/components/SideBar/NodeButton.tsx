// NodeButton: Button for dragging a node type into the flow
interface NodeButtonProps {
    label?: string;
    icon?: string | null;
    type?: string;
}

const NodeButton: React.FC<NodeButtonProps> = ({ label = "Node", icon = null, type = "default" }) => {
    // Set node type on drag start for React Flow drop
    const onDragStart = (e: React.DragEvent) => {
        e.dataTransfer.setData("application/node-type", type || "message");
    };
    return (
        <button
            draggable
            onDragStart={onDragStart}
            className="border border-primary text-primary rounded bg-white w-full flex flex-col gap-2 items-center justify-center px-4 py-2 text-sm cursor-grab"
        >
            {/* Show node icon if available */}
            {icon && <img draggable="false" src={icon} alt={type} className="w-8 h-8 inline-block" />}
            <span>{label}</span>
        </button>
    );
}

export default NodeButton;