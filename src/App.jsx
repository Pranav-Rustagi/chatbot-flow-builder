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

    useEffect(() => {
        if(activeNode !== null) {
            const node = rfInstance.getNode(activeNode);
            setEditableNodeText(node.data.text);
        }
    }, [rfInstance, activeNode]);

    
    const onSave = useCallback(() => {
        const targettedNodes = rfInstance.getEdges().reduce((acc, edge) => {
            const targettedNodeId = edge.target;
            acc.add(targettedNodeId);
            return acc;
        }, new Set());
        
        if (rfInstance.getNodes().length - targettedNodes.size > 1) {
            setToastProps(props => ({ ...props, show: true, type: "error" }));
            return;
        }
        
        setToastProps(props => ({ ...props, show: true, type: "success" }));
        const flow = rfInstance.toObject();
        flow['nextValidId'] = nextValidId;
        localStorage.setItem('chatbot-flow', JSON.stringify(flow));
    }, [rfInstance, setToastProps, nextValidId]);


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