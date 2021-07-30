export {dijkstra, getNodePath};

function dijkstra(graph: any[], startNode: any, endNode: any) {
  let queue = [] as any[];
  startNode.distance = 0;
  let visitedNodes = [];

  for (const row of graph) {
    for (const node of row) {
      queue.push(node);
    }
  }

  while (queue.length > 0) {
    queue.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
    const closestNode = queue.shift();
    if (closestNode.isWall) continue;
    if (closestNode.distance === Infinity) return visitedNodes;
    closestNode.isVisited = true;
    visitedNodes.push(closestNode);
    if (closestNode === endNode) return visitedNodes;
    upgradeUnvisitedNeighbours(closestNode, graph);
  }
}

function upgradeUnvisitedNeighbours(node: any, graph: any[]) {
  const unvisitedNeighbours = getUnvisitedNeighbours(node, graph);
  for (const neighbour of unvisitedNeighbours) {
    neighbour.distance = node.distance + 1;
    neighbour.previousNode = node;
  }
}

function getUnvisitedNeighbours(node: any, graph: any[]) {
  const neighbours = [];
  const {col, row} = node;
  if (row > 0) neighbours.push(graph[row-1][col]);
  if (row < graph.length - 1) neighbours.push(graph[row+1][col]);
  if (col > 0) neighbours.push(graph[row][col-1]);
  if (col < graph[0].length - 1) neighbours.push(graph[row][col+1]);
  return neighbours.filter(neighbours => neighbours !== undefined && !neighbours.isVisited)
}

function getNodePath(endNode: any) {
  const shortestPathToNode = [];
  let currentNode = endNode;
  while (currentNode !== null) {
    shortestPathToNode.unshift(currentNode);
    currentNode = currentNode.previousNode;
  }
  return shortestPathToNode;
}
