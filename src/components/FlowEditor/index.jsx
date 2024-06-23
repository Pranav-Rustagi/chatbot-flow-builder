import { useCallback, useEffect, useMemo, useRef } from 'react';
import ReactFlow, { Controls, addEdge, useEdgesState, useNodesState, useReactFlow } from 'reactflow';
import {MessageNode, Toast} from '../';

let dndid = 0;


const FlowEditor = ({ toastProps, rfInstance, setRfInstance, setNextValidId, setActiveNode }) => {
    const reactFlowWrapper = useRef(null);
    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
    const { screenToFlowPosition, setViewport } = useReactFlow();

    const nodeTypes = useMemo(() => ({
        message: MessageNode
    }), []);

    const getId = useCallback(() => {
        setNextValidId(dndid + 1);
        return `dndnode_${dndid++}`;
    }, [setNextValidId]);


    const restoreFlow = useCallback(async () => {
        const flow = JSON.parse(localStorage.getItem('chatbot-flow'));
        if (flow) {
            const { x = 0, y = 0, zoom = 1 } = flow.viewport;
            const nodes = flow?.nodes.map((node) => {
                return {
                    ...node,
                    selected: false
                }
            });

            setNodes(nodes || []);
            setEdges(flow?.edges || []);
            setViewport({ x, y, zoom });
            
            dndid = parseInt(flow?.nextValidId) || 0;
            setNextValidId(dndid);
        }
    }, [setNodes, setEdges, setViewport, setNextValidId]);


    const onConnect = useCallback((params) => {
        params.markerEnd = {
            type: "arrowclosed",
        }
        setEdges((eds) => addEdge(params, eds))
    }, [setEdges]);


    const customOnNodesChange = useCallback((params) => {
        const selectionTypeNodes = params.filter(n => n.type === 'select');
        const selectedNode = selectionTypeNodes.filter(n => n.selected);
        
        if (selectedNode.length > 0) {
            const selectedNodeId = selectedNode[0].id;
            setActiveNode(selectedNodeId);
        } else if (selectionTypeNodes.length > 0) {
            setActiveNode(null);
        }

        onNodesChange(params);
    }, [onNodesChange, setActiveNode]);

    const onDragOver = useCallback((event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    }, []);

    const onDrop = useCallback((event) => {
            event.preventDefault();

            const type = event.dataTransfer.getData('application/reactflow');

            if (typeof type === 'undefined' || !type) {
                return;
            }

            const position = screenToFlowPosition({ x: event.clientX, y: event.clientY });

            const newNode = {
                id: getId(),
                type,
                position,
                data: {
                    text: `text ${rfInstance?.getNodes().length + 1}`,
                },
                selectable: true
            };

            setNodes((nds) => nds.concat(newNode));
        },
        [screenToFlowPosition, rfInstance, setNodes, getId],
    );

    useEffect(() => {
        restoreFlow();
    }, []);

    return (
        <div className="flow-editor" ref={reactFlowWrapper}>
            <Toast {...toastProps} />
            <ReactFlow
                nodeTypes={nodeTypes}
                nodes={nodes}
                edges={edges}
                onInit={setRfInstance}
                onNodesChange={customOnNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                onDragOver={onDragOver}
                onDrop={onDrop}
                fitView
            >
                {/* <Background variant="dots" gap={30} size={2} /> */}
                <Controls />
            </ReactFlow>
        </div>
    )
}

export default FlowEditor;