import { HashRouter, Routes, Route } from 'react-router-dom';
import Home from './Home';
import SortingVisualizer from './Sorting/SortingVisualizer';
import PathFindingVisualizer from './PathFinding/PathFindingVisualizer';

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

