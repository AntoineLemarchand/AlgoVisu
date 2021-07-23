import React from 'react';
import { Route, HashRouter } from 'react-router-dom';
import SortingVisualizer from './components/Sorting/Visualizer/SortingVisualizer';
import PathFindingVisualizer from './components/PathFinding/Visualizer/PathFindingVisualizer';
import Home from './components/Home/Home';

function App() {
  return (
    <div className="App">
      <HashRouter>
        <Route exact path="/" component={Home} />
        <Route path="/sorting" component={SortingVisualizer} />
        <Route path="/pathfinding" component={PathFindingVisualizer} />
      </HashRouter>
    </div>
  );
}

export default App;
