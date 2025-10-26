// src/submit.js
/**
 * sendPipeline: sends nodes and edges to backend endpoint and alerts the result
 *
 * Usage: import { sendPipeline } and call sendPipeline({ nodes, edges })
 */
export async function sendPipeline({ nodes, edges }) {
  try {
    // send POST request to backend endpoint
    const res = await fetch("/pipelines/parse", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nodes, edges }), // payload includes nodes & edges
    });

    if (!res.ok) {
      // parse any returned error message
      const text = await res.text();
      throw new Error(`Server responded ${res.status}: ${text}`);
    }

    const json = await res.json(); // expects { num_nodes, num_edges, is_dag }
    // show user-friendly alert with results
    alert(
      `Pipeline parsed:\n• Nodes: ${json.num_nodes}\n• Edges: ${json.num_edges}\n• Acyclic (DAG): ${json.is_dag ? "Yes" : "No"}`
    );
    return json;
  } catch (err) {
    // surface errors to user
    alert(`Failed to submit pipeline: ${err.message}`);
    throw err;
  }
}
