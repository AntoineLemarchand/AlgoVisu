import {Component} from 'react';
import { Link } from 'react-router-dom';
import Footer from './Footer';

export default class Home extends Component {
  render() {
    return(
      <div className='h-screen flex flex-col'>
        <h1 className="text-6xl h-24 flex justify-center items-center bg-background text-primary font-mono">AlgoVisu</h1>
        <div className="bg-background/90 h-full flex justify-evenly items-center flex-col md:flex-row">
          <Link to="/sorting">
            <div className="py-16 px-8 text-center bg-info text-xl w-86 rounded-xl">
              Algorithme de tri
            </div>
          </Link>
          <Link to="/pathfinding">
            <div className="py-16 px-8 text-center bg-success text-xl w-86 rounded-xl">
              Algorithme de chemin
            </div>
          </Link>
        </div>
        {Footer("home")}
      </div>
    )
  }
}
