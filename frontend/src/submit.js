// submit.js

import { useStore } from "./store";
import shallow from "zustand/shallow"

export const SubmitButton = () => {

    const {nodes, edges} = useStore(state => ({ nodes: state.nodes, edges: state.edges }), shallow);
    
    const handleSubmit = async () => {
        console.log("nodes => ", nodes);
        console.log("edges => ", edges);

        //post to backend later
        const payload = {
            nodes,
            edges
        }

        try {
            const response = await fetch("http://localhost:8000/pipelines/parse", {
                    method: "POST",
                    headers: {
                    "Content-Type": "application/json",
                    },
                    body: JSON.stringify(payload),
            })

            const data = await response.json();
            console.log("Backend response:", data);

            alert(
                `Nodes: ${data.num_nodes}\nEdges: ${data.num_edges}\nDAG: ${data.is_dag}`
            );
        }
        catch(error){
            console.error("error while sending to backend >> ", error);
            alert("Failed to send to pipeline backend");
        }
    }

    return (
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <button type="submit" onClick={handleSubmit}>Submit</button>
        </div>
    );
}
