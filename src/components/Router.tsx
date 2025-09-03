import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Home from './Home/Home';
import SortingVisualizer from './Sorting/Visualizer/SortingVisualizer';
import PathFindingVisualizer from './PathFinding/Visualizer/PathFindingVisualizer';

export default function Router() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sorting" element={<SortingVisualizer />} />
        <Route path="/pathfinding" element={<PathFindingVisualizer />} />
      </Routes>
    </HashRouter>
  );
}

