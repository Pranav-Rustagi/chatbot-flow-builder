import { Handle, getConnectedEdges, useNodeId, useStore } from 'reactflow';
import src1 from '../../assets/image.png';
import src2 from '../../assets/whatsapp.png';
import { useMemo } from 'react';

const selector = (s) => ({
    nodeInternals: s.nodeInternals,
    edges: s.edges,
});

const MessageNode = ({ data }) => {
    const { nodeInternals, edges } = useStore(selector);
    const nodeId = useNodeId();

    // Checks if the source handler is already connected
    // Allows only one edge originating from a source handle
    const isHandleConnectable = useMemo(() => {
        const node = nodeInternals.get(nodeId);
        const connectedEdges = getConnectedEdges([node], edges).filter(e => e.source === node.id);
        return connectedEdges.length === 0;
    }, [nodeId, nodeInternals, edges]);

    return (
        <div className="message-node flex flex-col border-radius-5">
            <div className="node-header flex">
                <div className="flex">
                    <img src={src1} alt="" />
                    Send Message
                </div>
                <div className="flex">
                    <img src={src2} alt="" />
                </div>
            </div>
            <div className="node-body">
                {data?.text || ""}
            </div>
            <Handle type='source' position='right' isConnectable={isHandleConnectable} />
            <Handle type='target' position='left' isConnectable={true} />
        </div>
    );
}

export default MessageNode;