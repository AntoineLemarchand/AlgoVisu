import React, {Component} from 'react';
import './Node.css'

interface props {
  key: number,
  row: number,
  col: number,
  isStart: boolean,
  isFinish: boolean,
  isWall: boolean,
  onMouseDown: Function,
  onMouseEnter: Function,
  onMouseUp: Function,
}

export default class Node extends Component<props> {
  render() {
    const {
      row,
      col,
      isStart, 
      isFinish,
      isWall,
      onMouseDown,
      onMouseEnter,
      onMouseUp,
    } = this.props
    const className = isFinish ? 'node-finish' : isStart ? 'node-start' : isWall ? 'node-wall' : '';
      return (
        <div 
          className={`node ${className}`}
          id={`node-${row}-${col}`}
          onMouseDown={() => onMouseDown(row, col)}
          onMouseEnter={() => onMouseEnter(row, col)}
          onMouseUp={() => onMouseUp()}
          draggable={false}
        ></div>
      )
  }
}
