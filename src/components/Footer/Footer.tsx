import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = (page: string="home") => {
  return (
    <div id="footer">
      {(page === "sorting" || page === "pathfinding") && <Link to="/" id="home">Accueil</Link>}
      <a href="https://www.antoinelemarchand.xyz" id="portfolio">Portfolio</a>
    </div>
  )
}

export default Footer;
