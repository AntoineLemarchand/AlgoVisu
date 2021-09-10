import React from 'react';
import Routes from './components/Router';
import Helmet from 'react-helmet';
import './App.css';

function App() {
  return (
    <div className="App">
      <Helmet>
        <title>Algovisu</title>
      </Helmet>
      <Routes/>
    </div>
  );
}

export default App;
