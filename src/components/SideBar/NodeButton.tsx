interface NodeButtonProps {
    label?: string;
    icon?: string | null;
    type?: string;
}

const NodeButton: React.FC<NodeButtonProps> = ({ label = "Node", icon = null, type = "default" }) => {
    return (
        <button className="border border-primary text-primary rounded-md w-full flex flex-col gap-2 items-center justify-center px-4 py-2 text-sm cursor-grab">
            {icon && <img src={icon} alt={type} className="w-8 h-8 inline-block" />}
            <span>{label}</span>
        </button>
    )
}

export default NodeButton;