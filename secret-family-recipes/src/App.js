import React from 'react';
import logo from './logo.svg';
import './App.css';
import Home from './Components/Home';
import { Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Route exact path='/'>
        <Home />
      </Route>
      <Route path='/:userid'>
        <User />
      </Route>
    </div>
  );
}

export default App;
