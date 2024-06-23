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

    const isHandleConnectable = useMemo(() => {
        const node = nodeInternals.get(nodeId);
        const connectedEdges = getConnectedEdges([node], edges).filter(e => e.source === node.id);
        return connectedEdges.length === 0;
    }, [nodeId, nodeInternals, edges]);

    return (
        <div className="message-node" tabIndex={0}>
            <div className="node-header">
                <div>
                    <img src={src1} alt="" />
                    Send Message
                </div>
                <div>
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