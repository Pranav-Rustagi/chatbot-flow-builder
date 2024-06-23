import { useCallback } from "react";
import { NodesPanel, SettingsPanel } from "../";

const Sidebar = ({ rfInstance, value, setValue, activeNode, setActiveNode, onSave }) => {

    const setNodeText = useCallback((value) => {
        const node = rfInstance.getNode(activeNode);
        node.data.text = value;
        rfInstance.setNodes(nodes => nodes.map(n => n.id === activeNode ? node : n));
    }, [rfInstance, activeNode]);

    const onEdit = useCallback((event) => {
        const val = event.target.value;
        setNodeText(val);
        setValue(val);
    }, [setNodeText, setValue]);

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
                    value={value}
                    onEdit={onEdit}
                />
            }
        </div>
    );
}

export default Sidebar;