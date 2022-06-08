import React from 'react';
import logo from './logo.svg';
import './App.css';
import { MemoryRouter as Router, Route, Link } from 'react-router-dom';
import Documentation from './Documentation';
import GSCalc from './GSCalculator';
function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          Realizacja zadania nr2 w ramach laboratorium TCh <br />
          Autor: Konrad Miziński
          <Link to="/gscalc">Kalkulator ciągu geometrycznego</Link>
          <Link to="/docs">Dokumentacja</Link>
        </header>
        <div>
          <Route path="/gscalc" component={GSCalc} />
          <Route path="/docs" component={Documentation} />
        </div>
      </div>
    </Router>
  );
}

export default App;
