import 'reactflow/dist/style.css';
import { FlowEditor, Sidebar } from './components';
import { ReactFlowProvider } from 'reactflow';
import { useCallback, useEffect, useState } from 'react';

const App = () => {
    const [nextValidId, setNextValidId] = useState(0);
    const [rfInstance, setRfInstance] = useState(null);
    const [activeNode, setActiveNode] = useState(null);
    const [value, setValue] = useState('');
    const [error, setError] = useState(false);

    useEffect(() => {
        if(activeNode !== null) {
            const node = rfInstance.getNode(activeNode);
            setValue(node.data.text);
        }
    }, [rfInstance, activeNode]);

    
    const onSave = useCallback(() => {
        const targettedNodes = rfInstance.getEdges().reduce((acc, edge) => {
            const targettedNodeId = edge.target;
            acc.add(targettedNodeId);
            return acc;
        }, new Set());
        
        if (rfInstance.getNodes().length - targettedNodes.size > 1) {
            setError(true);
            return;
        }
        
        const flow = rfInstance.toObject();
        flow['nextValidId'] = nextValidId;
        localStorage.setItem('chatbot-flow', JSON.stringify(flow));
    }, [rfInstance, setError, nextValidId]);


    useEffect(() => {
        if (error === true) {
            setTimeout(() => {
                setError(false);
            }, 3000);
        }
    }, [error, setError]);


    return (
        <ReactFlowProvider>
            <div className="app-container">
                <FlowEditor
                    rfInstance={rfInstance}
                    setRfInstance={setRfInstance}
                    setNextValidId={setNextValidId}
                    setActiveNode={setActiveNode}
                    error={error}
                />

                <Sidebar
                    rfInstance={rfInstance}
                    value={value}
                    setValue={setValue}
                    activeNode={activeNode}
                    setActiveNode={setActiveNode}
                    onSave={onSave}
                />
            </div>
        </ReactFlowProvider>
    )
}

export default App;