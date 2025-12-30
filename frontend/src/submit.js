// submit.js

import { useStore } from "./store";
import shallow from "zustand/shallow"

export const SubmitButton = () => {

    const {nodes, edges} = useStore(state => ({ nodes: state.nodes, edges: state.edges }), shallow);
    
    const handleSubmit = () => {
        console.log("nodes => ", nodes);
        console.log("edges => ", edges);

        //post to backend later
    }

    return (
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <button type="submit" onClick={handleSubmit}>Submit</button>
        </div>
    );
}
