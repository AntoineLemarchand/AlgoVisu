import React, {Component} from 'react';
import { Link } from 'react-router-dom';

export default class Home extends Component {
  render() {
    return(
      <div id="Home">
        <Link to="/sorting">
          <div id="SortingButton" className="button">
            Visualisation d'algorithme de tri
          </div>
        </Link>
        <Link to="/pathfinding">
          <div id="PathFindingButton" className="button">
            Visualisation d'algorithme de chemin
          </div>
        </Link>
      </div>
    )
  }
}
