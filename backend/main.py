from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

# Enable CORS so frontend can connect
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # React dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Define request body model
class PipelineData(BaseModel):
    nodes: list
    edges: list

@app.get("/")
def root():
    return {"message": "Backend is running successfully!"}

@app.post("/pipelines/parse")
def parse_pipeline(data: PipelineData):
    num_nodes = len(data.nodes)
    num_edges = len(data.edges)
    
    # Check if it's a DAG (Directed Acyclic Graph)
    is_dag = check_dag(data.nodes, data.edges)
    
    return {
        "num_nodes": num_nodes,
        "num_edges": num_edges,
        "is_dag": is_dag
    }

def check_dag(nodes, edges):
    """
    Check if the graph is a Directed Acyclic Graph (DAG)
    using topological sort (Kahn's algorithm)
    """
    if not edges:
        return True  # No edges means it's a DAG
    
    # Build adjacency list and in-degree count
    from collections import defaultdict, deque
    
    graph = defaultdict(list)
    in_degree = defaultdict(int)
    
    # Initialize all nodes with in-degree 0
    node_ids = {node['id'] for node in nodes}
    for node_id in node_ids:
        in_degree[node_id] = 0
    
    # Build graph
    for edge in edges:
        source = edge['source']
        target = edge['target']
        graph[source].append(target)
        in_degree[target] += 1
    
    # Kahn's algorithm for cycle detection
    queue = deque([node for node in node_ids if in_degree[node] == 0])
    visited_count = 0
    
    while queue:
        node = queue.popleft()
        visited_count += 1
        
        for neighbor in graph[node]:
            in_degree[neighbor] -= 1
            if in_degree[neighbor] == 0:
                queue.append(neighbor)
    
    # If we visited all nodes, it's a DAG
    return visited_count == len(node_ids)