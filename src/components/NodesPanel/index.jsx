import chat_icon from "../../assets/image.png"

const NodesPanel = () => {
    const onDragStart = (event, nodeType) => {
        event.dataTransfer.setData('application/reactflow', nodeType);
        event.dataTransfer.effectAllowed = 'move';
    };

    return (
        <div className="nodes-panel">
            <div 
                className="node-placeholder" 
                draggable
                onDragStart={(event) => onDragStart(event, 'message')}
            >
                <img src={chat_icon} className="node-icon" alt="" draggable="false" />
                <span>Message</span>
            </div>
        </div>
    );
}

export default NodesPanel;