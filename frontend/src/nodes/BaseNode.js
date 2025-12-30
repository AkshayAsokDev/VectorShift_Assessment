//BaseNode.js

import { Handle, Position} from "reactflow";
import "../styles/nodes.css"

export const BaseNode = ( {title, handles = {}, children}) => {


    return (
        // container
            // header
            // body
            // input handle mapping
            // output handle mapping

        <div className="node-container">

            <div className="node-header">
                {title}
            </div>

            <div className="node-body">
                {children}
            </div>

            {/* input mapping handle */}
            {
                handles.inputs?.map(handle => (
                    <Handle 
                        key={handle.id}
                        id={handle.id}
                        type="target"
                        position={handle.position || Position.Left}
                    />
                ))
            }

            {/* input mapping handle */}
            {
                handles.outputs?.map(handle => (
                    <Handle 
                        key={handle.id}
                        id={handle.id}
                        type="source"
                        position={handle.position || Position.Right}
                    />
                ))
            }

        </div>
    )
}
