import { useCallback } from "react";
import { NodesPanel, SettingsPanel } from "../";

const Sidebar = ({ rfInstance, editableNodeText, setEditableNodeText, activeNode, setActiveNode, onSave }) => {

    const setNodeText = useCallback((val) => {
        const node = rfInstance.getNode(activeNode);
        node.data.text = val;
        rfInstance.setNodes(nodes => nodes.map(n => n.id === activeNode ? node : n));
    }, [rfInstance, activeNode]);

    const onEdit = useCallback((event) => {
        const val = event.target.value;
        setNodeText(val);
        setEditableNodeText(val);
    }, [setNodeText, setEditableNodeText]);

    const closeSettingsPanel = useCallback(() => {
        setActiveNode(null);
        rfInstance.setNodes(nodes => nodes.map((n) => ({...n, selected: false})));
    }, [rfInstance, setActiveNode]);
    
    
    return (
        <div className="sidebar flex flex-col">
            <div className="action-btn-container flex">
                <button className="btn" onClick={onSave}>Save Changes</button>
            </div>
            {
                activeNode === null ? 
                <NodesPanel /> : 
                <SettingsPanel
                    closeSettingsPanel={closeSettingsPanel}
                    editableNodeText={editableNodeText}
                    onEdit={onEdit}
                />
            }
        </div>
    );
}

export default Sidebar;