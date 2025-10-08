import { Nodes } from "../../constants";
import NodeButton from "./NodeButton";

const SideBar: React.FC = () => {
    return (
        <div className="flex-1 border-l border-neutral-300">
            <div className="grid grid-cols-2 grid-rows-none gap-3 p-3">
                {
                    Nodes.map((node) => (
                        <NodeButton
                            key={node.type}
                            label={node.label}
                            icon={node.icon}
                            type={node.type}
                        />
                    ))
                }
            </div>
        </div>
    )
}

export default SideBar;