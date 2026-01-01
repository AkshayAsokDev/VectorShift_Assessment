# adding cors policuy 
from fastapi.middleware.cors import CORSMiddleware

from fastapi import FastAPI, Form
from pydantic import BaseModel
from typing import List

from collections import defaultdict, deque

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # OK for assessment
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get('/')
def read_root():
    return {'Ping': 'Pong'}

# Classes with BaseModel for validation

class Pipeline(BaseModel):
    nodes: List
    edges: List



@app.post('/pipelines/parse')
def parse_pipeline(pipeline: Pipeline):
    nodes = pipeline.nodes
    edges = pipeline.edges
    num_nodes = len(pipeline.nodes)
    num_edges = len(pipeline.edges)

    graph = defaultdict(list)
    indegree = defaultdict(int)

    # creating an adjaency matrix and indegree count
    for edge in edges:
        src = edge["source"]
        tgt = edge["target"]
        graph[src].append(tgt)
        indegree[tgt] += 1

    # get the 0 indeg
    queue = deque([n["id"] for n in nodes if indegree[n["id"]] == 0])
    visited = 0

    # reduce indeg based on queue and append to queue if indeg is 0
    while queue:
        node = queue.popleft()
        visited += 1
        for nei in graph[node]:
            indegree[nei] -= 1
            if indegree[nei] == 0:
                queue.append(nei)

    is_dag = visited == num_nodes


    return {
        "num_nodes": num_nodes,
        "num_edges": num_edges,
        "is_dag": is_dag  # placeholder for now
    }
