import { useCallback } from "react";
import { NodesPanel, SettingsPanel } from "../";

const Sidebar = ({ rfInstance, editableNodeText, setEditableNodeText, activeNode, setActiveNode, onSave }) => {

    // Sets the text value of textarea in Settings Panel to the selected node
    const setNodeText = useCallback((val) => {
        const node = rfInstance.getNode(activeNode);
        node.data.text = val;
        rfInstance.setNodes(nodes => nodes.map(n => n.id === activeNode ? node : n));
    }, [rfInstance, activeNode]);

    // Onchange event handler for textarea in Settings Panel
    const onEdit = useCallback((event) => {
        const val = event.target.value;
        setNodeText(val);
        setEditableNodeText(val);
    }, [setNodeText, setEditableNodeText]);

    // Closes Settings Panel
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
                // Displays Settings Panel if activeNode is not null
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