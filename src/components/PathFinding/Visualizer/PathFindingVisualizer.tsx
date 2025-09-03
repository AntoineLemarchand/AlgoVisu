import React, { useState, useEffect, useCallback } from 'react';
import Node from '../Node/Node';
import { dijkstra, getNodePath } from '../Algorithms/Dijkstra';
import Footer from '../../Footer/Footer';

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

  const resetGrid = () => {
    grid.map(row =>
      row.map(node => {
        if (!node.isStart && !node.isFinish) {
          const el = document.getElementById(`node-${node.row}-${node.col}`);
          if (el) {
            el.classList.remove('bg-primary');
            el.classList.remove('bg-secondary');
            el.classList.remove('bg-info')
          }
        }
      })
    )
    makeGrid()
  };



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

  const animateDijkstra = (visitedNodes: NodeType[], path: NodeType[]) => {
    visitedNodes.forEach((node, i) => {
      setTimeout(() => {
        if (!node.isStart && !node.isFinish) {
          const el = document.getElementById(`node-${node.row}-${node.col}`);
          if (el) {
            el.classList.remove('bg-primary');
            el.classList.add('bg-secondary');
          }
          
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
          if (el) {
            el.classList.remove('bg-secondary');
            el.classList.add('bg-info')
          }
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
    <div className='h-screen flex flex-col'>
      <div className="bg-background h-24 p-4 flex justify-between items-center">
        <div className='flex'>
          <div className="text-primary flex flex-col">
            <label htmlFor="width" className='block mb-1 text-sm'>Size</label>
            <div>
              <input
                className='bg-secondary w-8 me-2 text-center rounded-md'
                min={1}
                max={20}
                type="number"
                name="rowSize"
                value={rowSize}
                onChange={changeGridSize}
              />
              X
              <input
                className='bg-secondary w-8 ms-2 text-center rounded-md'
                min={1}
                max={20}
                type="number"
                name="colSize"
                value={colSize}
                onChange={changeGridSize}
              />
            </div>
          </div>
        </div>
        <div>
          <select name="algo" onChange={changeAlgo} value={algo}
            className="bg-primary text-background px-2 h-12 rounded-md">
            <option value="dijkstra">Dijkstra</option>
            <option value="quick-sort">Quick sort</option>
            <option value="bubble-sort">Bubble sort</option>
            <option value="heap sort">Heap sort</option>
          </select>
        </div>
        <div className='rounded-lg overflow-hidden'>
          <button onClick={resetGrid} className='bg-failure p-2'>restart</button>
          <button onClick={visualize} className='bg-success p-2'>Visualize</button>
        </div>
      </div>

      <div className="w-screen flex flex-col justify-center items-center overflow-hidden bg-background/90 h-full">
        <div onMouseLeave={handleMouseLeave} onDragStart={(e) => e.preventDefault()}>
          {grid.map((row, rowIdx) => (
            <div className="flex" key={rowIdx}>
              {row.map(node => {
                return (
                  <Node
                    key={`${node.row}-${node.col}`}
                    row={node.row}
                    col={node.col}
                    isStart={node.isStart}
                    isFinish={node.isFinish}
                    isWall={node.isWall}
                    isVisited={node.isVisited}
                    isPath={node.isPath}
                    onMouseDown={handleMouseDown}
                    onMouseEnter={handleMouseEnter}
                    onMouseUp={handleMouseUp}
                  />
                )
              })}
            </div>
          ))}
        </div>
      </div>

      {Footer('pathfinder')}
    </div>
  );
}

