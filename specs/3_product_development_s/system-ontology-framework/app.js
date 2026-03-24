console.log('APP.JS LOADED');

const GRAPH_URL = 'lod_graph_cytoscape.json';

function cleanValue(value) {
  if (value == null) {
    return null;
  }

  if (typeof value === 'string') {
    const trimmed = value.trim();
    if (!trimmed || trimmed.toLowerCase() === 'nan' || trimmed.toLowerCase() === 'undefined') {
      return null;
    }
    return trimmed;
  }

  if (typeof value === 'number' && Number.isNaN(value)) {
    return null;
  }

  return value;
}

function normalizeId(value) {
  const cleaned = cleanValue(value);
  return cleaned == null ? null : String(cleaned).trim();
}

function pickNodeId(data, index) {
  const rawId = normalizeId(data['node-id'])
    || normalizeId(data.label)
    || normalizeId(data.name)
    || normalizeId(data.id);

  if (!rawId || rawId.startsWith('{')) {
    return 'node-' + (index + 1);
  }

  return rawId;
}

function pickLabel(data, fallbackId) {
  return normalizeId(data.label)
    || normalizeId(data['node-id'])
    || normalizeId(data.name)
    || normalizeId(data['sub-module'])
    || fallbackId;
}

function normalizePayload(payload) {
  if (Array.isArray(payload)) {
    return payload;
  }

  if (Array.isArray(payload && payload.elements)) {
    return payload.elements;
  }

  const nodes = Array.isArray(payload && payload.nodes) ? payload.nodes : [];
  const edges = Array.isArray(payload && payload.edges) ? payload.edges : [];
  return nodes.concat(edges);
}

function buildGraph(rawItems) {
  const nodes = [];
  const edges = [];
  const nodeIds = new Set();

  rawItems.forEach(function (item, index) {
    const data = (item && item.data) || item || {};
    const source = normalizeId(data.source || data.from);
    const target = normalizeId(data.target || data.to);

    if (source && target) {
      edges.push({
        data: {
          id: normalizeId(data.id) || 'edge-' + (edges.length + 1),
          source: source,
          target: target,
          label: normalizeId(data.label) || '',
          'edge-type': normalizeId(data['edge-type']) || normalizeId(data.label) || '',
          entity: normalizeId(data.entity),
          execution: normalizeId(data.execution),
          schedule: normalizeId(data.schedule),
          criticality: normalizeId(data.criticality)
        }
      });
      return;
    }

    const id = pickNodeId(data, index);
    if (!id || nodeIds.has(id)) {
      return;
    }

    nodeIds.add(id);
    nodes.push({
      data: {
        id: id,
        label: pickLabel(data, id),
        type: normalizeId(data.type),
        module: normalizeId(data.module),
        submodule: normalizeId(data['sub-module']),
        codebase: normalizeId(data['code-base']),
        environment: normalizeId(data['execution-environment'])
      }
    });
  });

  const filteredEdges = edges.filter(function (edge) {
    return nodeIds.has(edge.data.source) && nodeIds.has(edge.data.target);
  });

  return { nodes: nodes, edges: filteredEdges };
}

function setStatus(message, isError) {
  const cyContainer = document.getElementById('cy');
  cyContainer.innerHTML = '';
  cyContainer.style.display = 'grid';
  cyContainer.style.placeItems = 'center';
  cyContainer.style.color = isError ? '#9f1239' : '#1f2937';
  cyContainer.style.font = '600 16px/1.4 system-ui, sans-serif';
  cyContainer.textContent = message;
}

function colorForType(type) {
  const normalized = (type || '').toLowerCase();

  if (normalized === 'ui') {
    return '#2563eb';
  }

  if (normalized === 'script') {
    return '#0f766e';
  }

  if (normalized === 'datastore') {
    return '#a16207';
  }

  return '#475569';
}

async function loadGraph() {
  try {
    const res = await fetch(GRAPH_URL, { cache: 'no-store' });
    if (!res.ok) {
      throw new Error('Fetch failed: ' + res.status + ' ' + res.statusText);
    }

    const rawText = await res.text();
    const sanitizedText = rawText.replace(/\bNaN\b/g, 'null');
    const payload = JSON.parse(sanitizedText);
    const rawItems = normalizePayload(payload);
    const graph = buildGraph(rawItems);

    console.log('GRAPH COUNTS:', {
      rawItems: rawItems.length,
      nodes: graph.nodes.length,
      edges: graph.edges.length
    });

    if (!graph.nodes.length) {
      setStatus('No valid nodes found in lod_graph_cytoscape.json', true);
      return;
    }

    document.getElementById('cy').style.display = 'block';

    graph.nodes.forEach(function (node) {
      node.data.color = colorForType(node.data.type);
    });

    const cy = cytoscape({
      container: document.getElementById('cy'),
      elements: graph.nodes.concat(graph.edges),
      style: [
        {
          selector: 'node',
          style: {
            label: 'data(label)',
            'background-color': 'data(color)',
            color: '#ffffff',
            'text-wrap': 'wrap',
            'text-max-width': 120,
            'text-valign': 'center',
            'text-halign': 'center',
            'font-size': 12,
            'font-weight': 700,
            'text-outline-width': 2,
            'text-outline-color': '#0f172a',
            'text-outline-opacity': 0.18,
            width: 72,
            height: 72,
            'border-width': 2,
            'border-color': '#0f172a',
            'border-opacity': 0.28,
            'overlay-opacity': 0,
            'shadow-blur': 18,
            'shadow-color': '#0f172a',
            'shadow-opacity': 0.12,
            'shadow-offset-x': 0,
            'shadow-offset-y': 6
          }
        },
        {
          selector: 'node[type = "UI"]',
          style: {
            shape: 'round-rectangle'
          }
        },
        {
          selector: 'node[type = "Datastore"]',
          style: {
            shape: 'diamond'
          }
        },
        {
          selector: 'node[type = "Script"]',
          style: {
            shape: 'ellipse'
          }
        },
        {
          selector: 'edge',
          style: {
            width: 3,
            label: 'data(label)',
            color: '#334155',
            'font-size': 10,
            'font-weight': 600,
            'text-background-color': '#ffffff',
            'text-background-opacity': 0.9,
            'text-background-padding': 3,
            'text-rotation': 'autorotate',
            'curve-style': 'bezier',
            'line-color': '#64748b',
            'target-arrow-color': '#64748b',
            'target-arrow-shape': 'triangle',
            'arrow-scale': 1.1,
            'overlay-opacity': 0
          }
        },
        {
          selector: 'edge[edge-type = "writes"]',
          style: {
            'line-style': 'dashed'
          }
        },
        {
          selector: 'edge[edge-type = "returns"]',
          style: {
            'line-color': '#7c3aed',
            'target-arrow-color': '#7c3aed'
          }
        },
        {
          selector: 'edge[edge-type = "navigates"]',
          style: {
            'line-color': '#db2777',
            'target-arrow-color': '#db2777'
          }
        }
      ],
      layout: {
        name: 'breadthfirst',
        directed: true,
        spacingFactor: 1.15,
        padding: 60,
        fit: true,
        animate: false
      }
    });

    cy.ready(function () {
      console.log('GRAPH READY:', cy.elements().length);
    });
  } catch (error) {
    console.error('GRAPH LOAD FAILED:', error);
    setStatus('Graph load failed: ' + error.message, true);
  }
}

loadGraph();
