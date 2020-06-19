import React from 'react';
import logo from './logo.svg';
import './App.css';
import Home from './Components/Home';
import { Route } from 'react-router-dom';
import User from './Components/User';
import Recipe from './Components/Recipe';

function App() {
  return (
    <div className="App">
      <Route exact path='/'>
        <Home />
      </Route>
      <Route exact path='/:userid'>
        <User />
      </Route>
      <Route path='/:userid/:recipeid'>
        <Recipe />
      </Route>
    </div>
  );
}

export default App;
