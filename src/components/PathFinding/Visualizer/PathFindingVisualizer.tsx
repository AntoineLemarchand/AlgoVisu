import React, {Component} from 'react';
import Node from '../Node/Node';
import { dijkstra, getNodePath } from '../Algorithms/Dijkstra';
import Footer from '../../Footer/Footer';
import './PathFindingVisualizer.css';

export default class PathFindingVisualizer extends Component {
  state = {
    rowSize: 10,
    colSize: 20,
    startNode: {row: 2, col:2},
    endNode: {row:8,col:16},
    grid: [],
    preview: undefined,
    algo: 'dijkstra',
    mouseIsPressed: false,
  }

  handleMouseDown = (row: number, col: number) => {
    const newGrid = this.getNewGridWithWallToggled(this.state.grid, row, col);
    this.setState({grid: newGrid, mouseIsPressed: true});
  }

  handleMouseEnter = (row: number, col: number) => {
    if (!this.state.mouseIsPressed) return;
    const newGrid = this.getNewGridWithWallToggled(this.state.grid, row, col);
    this.setState({grid: newGrid})
  }

  handleMouseUp = () => {
    this.setState({mouseIsPressed: false})
  }

  makeGrid = () => {
    const grid = [];
    for (let row = 0;row < this.state.rowSize; row++) {
      const currentRow = []
      for (let col = 0;col < this.state.colSize; col++) {
        const currentNode = {
          row,
          col,
          isStart: row === this.state.startNode.row && col === this.state.startNode.col,
          isFinish: row === this.state.endNode.row && col === this.state.endNode.col,
          isWall: false,
          distance: Infinity,
          isVisited: false,
          previousNode: null,
        }
        currentRow.push(currentNode);
      }
      grid.push(currentRow);
    }
    this.setState({grid});
    this.setState({preview: this.displayGrid()})
    return grid;
  }

  resetGrid = () => {
    for (let row = 0;row < this.state.rowSize; row++) {
      for (let col = 0; col < this.state.colSize; col++) {
        let node = document.getElementById(`node-${row}-${col}`)
        if (node !== null) {
          if (node.className === 'node node-start node-visited' || node.className === 'node node-start') {
            node.className = 'node node-start';
          } else if (node.className === 'node node-finish node-visited' || node.className === 'node node-finish') {
            node.className = 'node node-finish';
          } else if (node.className !== 'node node-wall') {
            node.className = 'node';
          }
        }
      }
    }
  }

  getNewGridWithWallToggled = (grid: any[], row: number, col: number) => {
    const newGrid = grid.slice();
    const node = newGrid[row][col];
    const newNode = {
      ...node,
      isWall: !node.isWall,
    };
    newGrid[row][col] = newNode;
    this.setState({grid: this.makeGrid(), preview: this.displayGrid()});
    return newGrid;
  }

  displayGrid = () => {
    let preview =  
      this.state.grid.map((row: any[], index: number) => {
        return( <div className="row" key={index}>
          {
            row.map((node: any, index: number) => {
              const {row, col, isStart, isFinish, isWall} = node;
              return(
                <Node
                  key={index}
                  row={row}
                  col={col}
                  isStart={isStart}
                  isFinish={isFinish}
                  isWall={isWall}
                  onMouseDown={(row: number, col: number) => this.handleMouseDown(row, col)}
                  onMouseEnter={(row: number, col: number) => this.handleMouseEnter(row, col)}
                  onMouseUp={this.handleMouseUp}
                />
              )
            })
          }
          </div>
          )
      })
      return preview
    }

  changeGrid = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    if (Number(event.target.value) > 0) {
      this.setState({[event.target.name]: event.target.value});
    } else {
      this.setState({[event.target.name]: 20});
    }
    setTimeout(() => { 
      this.setState({startNode: {row: Math.floor(this.state.rowSize/3),col: 0}})
      this.setState({endNode: {row: Math.floor(this.state.rowSize*2/3),col: this.state.colSize-1}})
      this.makeGrid();
    },0);
  }

  changeAlgo = (event: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({algo: event.target.value})
  }

  animateDijkstra = (visitedNodes: any, path: any[]) => {
    this.setState({preview: this.displayGrid()});
    for (let i = 0; i <= visitedNodes.length; i++) {
      if (i === visitedNodes.length) {
        setTimeout(() => {
          this.animatePath(path);
        }, 10 * i);
        return;
      }
      setTimeout(() => {
        const node = visitedNodes[i];
        const ids = document.getElementById(`node-${node.row}-${node.col}`);
        if (ids != null && ids.className !== 'node node-start' && ids.className !== 'node node-finish') ids.className = 'node node-visited';
      }, 10 * i)
    }
  }

  animatePath = (path: any[]) => {
    this.setState({preview: this.displayGrid()});
    for (let i = 0; i < path.length; i++) {
      setTimeout(() => {
        const cells = path[i];
        const cell = document.getElementById(`node-${cells.row}-${cells.col}`);
            if (cell !== null && cell.className !== 'node node-finish') {
              if (cell.className !== 'node node-finish' && cell.className !== 'node node-start') {
                cell.className = 'node node-shortest-path';
              }
        }
      },10*i)
    }
  }

  visualizeDijkstra = () => {
    const {grid} = this.state;
    const startCell = grid[this.state.startNode.row][this.state.startNode.col];
    const endCell = grid[this.state.endNode.row][this.state.endNode.col];
    const visitedCells = dijkstra(grid, startCell, endCell);
    const path = getNodePath(endCell);
    this.animateDijkstra(visitedCells, path)
  }

  visualize = (algo: string) => {
    switch(algo){
      case "dijkstra":
        this.visualizeDijkstra();
        break;
    }
  }

  componentDidMount() {
    setTimeout(() => this.setState({grid: this.makeGrid()}),0)
  }

  render() {
    return(
      <div id="pathFindingVIsualizer">
        <div id="header">
          <div id="headerLeft">
            <div id="selectAlgo">
              <div id="widthSelect">
                <label htmlFor="width">Lignes</label>
                <input 
                  type="number"
                  name="rowSize" 
                  placeholder="10" 
                  onChange={this.changeGrid}/>
              </div>
              <div id="heightSelect">
                <label htmlFor="height">Colonnes</label>
                <input 
                  type="number" 
                  name="colSize" 
                  placeholder="20" 
                  onChange={this.changeGrid}/>
              </div>
              <select name="algo" onChange={this.changeAlgo}>
                <option value="dijkstra">Dijkstra</option>
              </select>
            </div>
          </div>
          <div id="headerRight">
            <button id="resetButton" onClick={this.resetGrid}>Redémarrer</button>
            <button id="visButton" onClick={() => this.visualize(this.state.algo)}>Visualiser l'algorithme</button>
          </div>
        </div>
        <div id="viewer">
          {
            this.state.preview
          }
        </div>
        {Footer("pathfinder")}
      </div>
    )
  }
}
