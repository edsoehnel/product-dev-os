# C4 Model (industry standard)

1. Context (system in the world)
2. Container (apps/services)
3. Component (modules inside apps)
4. Code (classes/functions)

## Tools

### graphical interface (lucidchart)
- start here to map the system
- this is for high-level thinking, presentation, human UI

### spreadsheet (System catalog / service registry / data dictionary hybrid)

As youi build the system and its files and components, you create a machine-readable system graph that is a declarative system model where everything is described, and everything else is derived from it:
- diagrams
- monitoring
- orchestration
- agents
The spreadsheet is the SOURCE OF TRUTH. JSON is a derived artifact. The Cytoscape graph is a VIEW. Never manually edit JSON long-term — generate it.

Ai can use this to:
1. generate diagrams automatially
2. detect issueso
- orphaned components
- circular dependencies
- unused scripts
- data inconsistencies
3. build agents
- “Find all nodes where operation=VALIDATE and auto-optimize”
4. simulate system
- what happens if ...
- what breaks if ...
5.generate code scaffolding
- FastAPI routes
- cron jobs
- validators
6. build inference layer
See template. 

### Process
1. build graphical interface for human documenting components and flow. Build in small, disrete modules you can put a box around that is on its own.  Define flows, outcomes.  Then, define nodes and edges - ontology draft
2. Code the components
3. Have AI create the actual graph in the spreadsheet based on the templates - see in same folder for this file. Create in csv, copy and save as csv, open csv in spreadsheet, copy to gsheets file. Try to fit to validators sheet 
4. Have AI build the corresponding json file. Invalid JSON (e.g. NaN) → graph will not render. See template of prior one created - graph_edges_nodes.json This is ontology final
4. Create browser-based cytoscape graph viewer - instructions below
5. Fix mismatches between ontologt draft and ontology final

#### Example:

Add Customer Module
Trigger: user submits form
Input: customer data
Process:
    validate → write → index update
Output:
    new customer JSON

Graph:

UI → API → validate → storage → index → response

If a module does more than one of these → it’s too big.

#### Practical Rules for Your Future Builds
1. Rule 1 — Always start with flow

Before coding:

User action → API → validation → storage → response

2. Rule 2 — Cap module size

If a module:

touches > 5 files
has > 1 primary route

👉 split it

3. Rule 3 — Every module must be drawable as a box

If you can’t draw a clean box around it:

👉 it’s not a module yet

4. Rule 4 — Graph is not documentation

This is important:

Your graph is not a diagram — it is a system constraint

You should be able to say:

“this edge is invalid”
“this node should not exist”

### System Graph

1. Create project in WSL
mkdir ~/(name)-system-graph
cd ~/(name)-system-graph
2. create index.html - adjust file name being rendered (step 4)
3. create app.js - adjust file name being rendered (step 4)
4. convert spreadsheet to JSON and create _(name)_graph_cytoscape.json
- - JSON MUST be a flat array of Cytoscape elements:

[
  { data: { id, label } },
  { data: { source, target } }
]

NOT:
{ nodes: [...], edges: [...] }
- - Node IDs must be:
- - - exact string match
-  - -trimmed (no trailing spaces)
-  - - no annotations (remove "(API)", "(DB)", etc.)
Edges must reference these exact IDs.
5. copy to WSl folder  cp /mnt/c/Users/<your-user>/Desktop/lod_graph_cytoscape.json ~/system-graph/
5. run on wsl: python3 -m http.server 8000
6. http://localhost:8000
7. Always edit the file the server is serving (WSL). Invalid JSON (e.g. NaN) → graph will not render. Node IDs must match edge references exactly. Use fetch debug to verify actual runtime data
- - fetch('lod_graph_cytoscape.json')
  .then(r => r.text())
  .then(console.log)
8. Edit and adjust scripts as needed using codex desktop or in terminal, then output the files to desktop to save cp ~/system-graph/app.js ~/system-graph/index.html ~/system-graph/lod_graph_cytoscape.json /mnt/c/Users/edsoe/Desktop/


## Other

### Add environment boundary rule (this was THE issue)

You mention copying, but not the underlying principle.

Add:

The browser only sees files served by the WSL server.

Editing files on Desktop has no effect until copied into WSL.

Always verify the runtime file, not the edited file.

### Add minimal test graph (for sanity check)

This is a must-have reset tool:

[
  { "data": { "id": "A", "label": "A" } },
  { "data": { "id": "B", "label": "B" } },
  { "data": { "id": "e1", "source": "A", "target": "B" } }
]

Use when debugging pipeline.

### Add layout note (optional but useful)
Default layout: cose (force-directed)

If graph looks flat or clustered:
- adjust layout
- or check connectivity

### Common Failure Modes
- | Symptom              | Cause                               |
| -------------------- | ----------------------------------- |
| Blank graph          | JSON invalid OR fetch failed        |
| “Unexpected token N” | NaN in JSON                         |
| A→B→C won’t change   | editing wrong file (WSL vs Desktop) |
| Graph collapsed      | edge references missing nodes       |
| No console logs      | app.js not loaded                   |

