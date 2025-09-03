import React from 'react';
import { Link } from 'react-router-dom';

const Footer = (page: string="home") => {
  return (
    <div className="bg-background h-24 flex justify-evenly items-center">
      {(page === "sorting" || page === "pathfinder") && <Link className="outline outline-primary rounded-2xl text-primary hover:bg-primary hover:text-background p-4" to="/" id="home">Home</Link>}
      <a href="https://www.antoinelemarchand.xyz" className="outline outline-primary rounded-2xl text-primary hover:bg-primary hover:text-background p-4">Portfolio</a>
    </div>
  )
}

export default Footer;
