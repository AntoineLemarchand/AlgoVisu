import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import Footer from '../Footer/Footer';
import './Home.css';

export default class Home extends Component {
  render() {
    return(
      <div id="Home">
        <h1 id="title">AlgoVisu : visualiseur d'algorithme</h1>
        <div id="Links">
          <Link to="/sorting">
            <div id="SortingButton" className="button">
              Algorithme de tri
            </div>
          </Link>
          <Link to="/pathfinding">
            <div id="PathFindingButton" className="button">
              Algorithme de chemin
            </div>
          </Link>
        </div>
        {Footer("home")}
      </div>
    )
  }
}
