import React, {Component} from 'react';
import { Route, HashRouter } from 'react-router-dom';
import Home from './Home/Home';
import SortingVisualizer from './Sorting/Visualizer/SortingVisualizer';
import PathFindingVisualizer from './PathFinding/Visualizer/PathFindingVisualizer';

export default class Router extends Component {
  render() {
    return(
        <HashRouter>
          <Route exact path="/" component={Home} />
          <Route path="/sorting" component={SortingVisualizer} />
          <Route path="/pathfinding" component={PathFindingVisualizer} />
        </HashRouter>
    )
  }
}
