import React, {Component} from 'react';
import Node from '../Node/Node';

export default class PathFindingVisualizer extends Component {
  state = {
    mouseIsPressed: false,
    startRow: 5,
    finishRow: 15,
    startCol: 5,
    finishCol: 15,
    grid: [] as any[]
  }

  makeNode = (col: number, row: number) => {
    return{
      col, 
      row,
      isStart: row === this.state.startRow && col === this.state.startCol,
      isFinish: row === this.state.finishRow && col === this.state.finishRow,
      isVisited: false,
      isWall: false,
      distance: Infinity,
      previousNode: null,
    }
  }

  makeGrid = (numRow: number, numCol: number) => {
    const grid = [] as any[];
    for (var row = 0; row < numRow; row++) {
      const currentRow = [] as any[];
      for (var col = 0; col < numCol; col++) {
        currentRow.push(this.makeNode(row,col));
      }
      grid.push(currentRow);
    }
    return grid;
  };

  makeNewGridWithWall = (grid: any[], row: number, col: number) => {
  }

  handleMouseDown = (row: number, col: number) => {
    const newGrid = this.makeNewGridWithWall(this.state.grid, row, col);
    this.setState({grid: newGrid, mouseIsPressed: true})
  }
  
  handleMouseEnter = (row:number, col: number) => {
    if (!this.state.mouseIsPressed) return;
    const newGrid = this.makeNewGridWithWall(this.state.grid, row, col);
    this.setState({grid: newGrid})
  }

  handleMouseUp = (e: MouseEvent) => {
    this.setState({mouseIsPressed: false})
  }

  componentDidMount = () => {
    this.setState({grid: this.makeGrid}
  )}

  render() {
    return(
      <div id="PathFindingVisualizer">
      </div>
    )
  }
}
