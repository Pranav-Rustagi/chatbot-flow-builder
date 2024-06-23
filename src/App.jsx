import 'reactflow/dist/style.css';
import { FlowEditor, Sidebar } from './components';
import { ReactFlowProvider } from 'reactflow';
import { useCallback, useEffect, useState } from 'react';

const App = () => {
    const [nextValidId, setNextValidId] = useState(0);
    const [rfInstance, setRfInstance] = useState(null);
    const [activeNode, setActiveNode] = useState(null);
    const [editableNodeText, setEditableNodeText] = useState('');
    const [toastProps, setToastProps] = useState({ show: false });

    // Sets the text of the selected node to the textarea in Settings Panel
    useEffect(() => {
        if(activeNode !== null) {
            const node = rfInstance.getNode(activeNode);
            setEditableNodeText(node.data.text);
        }
    }, [rfInstance, activeNode]);

    
    // Saves the flow to local storage including the nextValidId
    const onSave = useCallback(() => {
        const targettedNodes = rfInstance.getEdges().reduce((acc, edge) => {
            const targettedNodeId = edge.target;
            acc.add(targettedNodeId);
            return acc;
        }, new Set());
        
        // Shows error toast if there are more than one node in the flow that are not connected
        if (rfInstance.getNodes().length - targettedNodes.size > 1) {
            setToastProps(props => ({ ...props, show: true, type: "error" }));
            return;
        }
        
        // Shows success toast if there are no errors
        setToastProps(props => ({ ...props, show: true, type: "success" }));
        const flow = rfInstance.toObject();
        flow['nextValidId'] = nextValidId;
        localStorage.setItem('chatbot-flow', JSON.stringify(flow));
    }, [rfInstance, setToastProps, nextValidId]);


    // Hides toast after 5 seconds
    useEffect(() => {
        if (toastProps.show === true) {
            setTimeout(() => {
                setToastProps(props => ({ ...props, show: false }));
            }, 5000);
        }
    }, [toastProps.show, setToastProps]);


    return (
        <ReactFlowProvider>
            <div className="app-container flex">
                <FlowEditor
                    rfInstance={rfInstance}
                    setRfInstance={setRfInstance}
                    setNextValidId={setNextValidId}
                    setActiveNode={setActiveNode}
                    toastProps={toastProps}
                />

                <Sidebar
                    rfInstance={rfInstance}
                    editableNodeText={editableNodeText}
                    setEditableNodeText={setEditableNodeText}
                    activeNode={activeNode}
                    setActiveNode={setActiveNode}
                    onSave={onSave}
                />
            </div>
        </ReactFlowProvider>
    )
}

export default App;