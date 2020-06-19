import React from 'react';
import logo from './logo.svg';
import './App.css';
import Home from './Components/Home';
import { Route, Switch } from 'react-router-dom';
import User from './Components/User';
import Recipe from './Components/Recipe';
import Signup from './Components/Signup';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path='/signup'>
          <Signup />
        </Route>
        <Route path='/:userid/:recipeid'>
          <Recipe />
        </Route>
        <Route path='/:userid'>
          <User />
        </Route>
        <Route path='/'>
          <Home />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
