import React from 'react';

type Props = {
  row: number;
  col: number;
  isStart: boolean;
  isFinish: boolean;
  isWall: boolean;
  isVisited?: boolean;
  isPath?: boolean;
  onMouseDown: (row: number, col: number) => void;
  onMouseEnter: (row: number, col: number) => void;
  onMouseUp: () => void;
};

export default function Node({
  row,
  col,
  isStart,
  isFinish,
  isWall,
  isVisited,
  isPath,
  onMouseDown,
  onMouseEnter,
  onMouseUp,
}: Props) {
  const base = "outline outline-primary/50 h-8 w-8 select-none transition-colors duration-150";
  const variant =
    isStart   ? "bg-success cursor-grab" :
    isFinish  ? "bg-failure cursor-grab" :
    isWall    ? "bg-primary" :
    isPath    ? "bg-info" :
    isVisited ? "bg-secondary/60" :
                "bg-background";

  return (
    <div
      className={`${base} ${variant}`}
      id={`node-${row}-${col}`}
      onMouseDown={() => onMouseDown(row, col)}
      onMouseEnter={() => onMouseEnter(row, col)}
      onMouseUp={() => onMouseUp()}
      draggable={false}
    />
  );
}

