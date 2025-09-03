import React, { useState, useEffect, useCallback } from 'react';
import Node from '../Node/Node';
import { dijkstra, getNodePath } from '../Algorithms/Dijkstra';
import Footer from '../../Footer/Footer';
import './PathFindingVisualizer.css';

interface NodeType {
  row: number;
  col: number;
  isStart: boolean;
  isFinish: boolean;
  isWall: boolean;
  distance: number;
  isVisited: boolean;
  previousNode: NodeType | null;
}

export default function PathFindingVisualizer() {
  const [rowSize, setRowSize] = useState(10);
  const [colSize, setColSize] = useState(20);
  const [startNode, setStartNode] = useState({ row: 2, col: 2 });
  const [endNode, setEndNode] = useState({ row: 8, col: 16 });
  const [draggingNode, setDraggingNode] = useState<'start' | 'finish' | null>(null);
  const [grid, setGrid] = useState<NodeType[][]>([]);
  const [algo, setAlgo] = useState('dijkstra');
  const [mouseIsPressed, setMouseIsPressed] = useState(false);

  // Initialize grid
  const makeGrid = useCallback(() => {
    const newGrid: NodeType[][] = [];
    for (let row = 0; row < rowSize; row++) {
      const currentRow: NodeType[] = [];
      for (let col = 0; col < colSize; col++) {
        currentRow.push({
          row,
          col,
          isStart: row === startNode.row && col === startNode.col,
          isFinish: row === endNode.row && col === endNode.col,
          isWall: false,
          distance: Infinity,
          isVisited: false,
          previousNode: null,
        });
      }
      newGrid.push(currentRow);
    }
    setGrid(newGrid);
  }, [rowSize, colSize, startNode, endNode]);

  const makeGridWithFixedNodes = (
    startRow: number,
    startCol: number,
    endRow: number,
    endCol: number
  ) => {
    setGrid(prev =>
      prev.map(row =>
        row.map(node => ({
          ...node,
          isStart: node.row === startRow && node.col === startCol,
          isFinish: node.row === endRow && node.col === endCol,
        }))
      )
    );
  };


  useEffect(() => {
    makeGrid();
  }, [makeGrid]);

  // Toggle wall
  const toggleWall = (row: number, col: number) => {
    setGrid(prev =>
      prev.map(r =>
        r.map(node => {
          if (node.row === row && node.col === col) {
            return { ...node, isWall: !node.isWall };
          }
          return node;
        })
      )
    );
  };

  // Mouse handlers
  const handleMouseDown = (row: number, col: number) => {
    const node = grid[row][col];
    if (node.isStart) setDraggingNode('start');
    else if (node.isFinish) setDraggingNode('finish');
    else toggleWall(row, col);

    setMouseIsPressed(true);
  };

  const handleMouseEnter = (row: number, col: number) => {
    if (!mouseIsPressed) return;

    if (draggingNode === 'start') {
      setStartNode({ row, col });
      makeGridWithFixedNodes(row, col, endNode.row, endNode.col);
    } else if (draggingNode === 'finish') {
      setEndNode({ row, col });
      makeGridWithFixedNodes(startNode.row, startNode.col, row, col);
    } else {
      toggleWall(row, col);
    }
  };

  const handleMouseUp = () => {
    setMouseIsPressed(false);
    setDraggingNode(null);
  };



  const handleMouseLeave = () => setMouseIsPressed(false);

  // Grid reset
  const resetGrid = () => {
  setGrid(prev =>
    prev.map(row =>
      row.map(node => ({
        ...node,
        isVisited: false,
        distance: Infinity,
        previousNode: null,
        isWall: false,
      }))
    )
  );
  grid.forEach(row =>
    row.forEach(node => {
      const el = document.getElementById(`node-${node.row}-${node.col}`);
      if (!el) return;
      if (node.isStart) el.className = 'node node-start';
      else if (node.isFinish) el.className = 'node node-finish';
      else if (node.isWall) el.className = 'node node-wall';
      else el.className = 'node';
    })
  );
};


  // Grid size change
  const changeGridSize = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value);
    if (value > 0) {
      if (event.target.name === 'rowSize') setRowSize(value);
      else setColSize(value);
    }
  };

  const changeAlgo = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setAlgo(event.target.value);
  };

  // Dijkstra animation
  const animateDijkstra = (visitedNodes: NodeType[], path: NodeType[]) => {
    visitedNodes.forEach((node, i) => {
      setTimeout(() => {
        if (!node.isStart && !node.isFinish) {
          const el = document.getElementById(`node-${node.row}-${node.col}`);
          if (el) el.className = 'node node-visited';
        }
      }, 10 * i);
    });

    setTimeout(() => animatePath(path), 10 * visitedNodes.length);
  };

  const animatePath = (path: NodeType[]) => {
    path.forEach((node, i) => {
      setTimeout(() => {
        if (!node.isStart && !node.isFinish) {
          const el = document.getElementById(`node-${node.row}-${node.col}`);
          if (el) el.className = 'node node-shortest-path';
        }
      }, 50 * i);
    });
  };

  const visualizeDijkstra = () => {
    const startCell = grid[startNode.row][startNode.col];
    const endCell = grid[endNode.row][endNode.col];
    const visitedNodes = dijkstra(grid, startCell, endCell);
    const path = getNodePath(endCell);
    animateDijkstra(visitedNodes, path);
  };

  const visualize = () => {
    switch (algo) {
      case 'dijkstra':
        visualizeDijkstra();
        break;
    }
  };

  return (
    <div id="pathFindingVisualizer">
      <div id="header">
        <div id="headerLeft">
          <div id="selectAlgo">
            <div id="widthSelect">
              <label htmlFor="width">Lignes</label>
              <input
                type="number"
                name="rowSize"
                value={rowSize}
                onChange={changeGridSize}
              />
            </div>
            <div id="heightSelect">
              <label htmlFor="height">Colonnes</label>
              <input
                type="number"
                name="colSize"
                value={colSize}
                onChange={changeGridSize}
              />
            </div>
            <select name="algo" onChange={changeAlgo} value={algo}>
              <option value="dijkstra">Dijkstra</option>
            </select>
          </div>
        </div>
        <div id="headerRight">
          <button onClick={resetGrid}>Redémarrer</button>
          <button onClick={visualize}>Visualiser l'algorithme</button>
        </div>
      </div>

      <div id="viewer">
        <div onMouseLeave={handleMouseLeave} onDragStart={(e) => e.preventDefault()}>
          {grid.map((row, rowIdx) => (
            <div className="row" key={rowIdx} draggable={false}>
              {row.map((node, nodeIdx) => (
                <Node
                  key={nodeIdx}
                  row={node.row}
                  col={node.col}
                  isStart={node.isStart}
                  isFinish={node.isFinish}
                  isWall={node.isWall}
                  onMouseDown={() => handleMouseDown(node.row, node.col)}
                  onMouseEnter={() => handleMouseEnter(node.row, node.col)}
                  onMouseUp={handleMouseUp}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      {Footer('pathfinder')}
    </div>
  );
}

