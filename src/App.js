import React from 'react';
import './App.css';
import Home from './Components/Home';
import Recipe from './Components/Recipe';
import User from './Components/User';
import { Route, Link, Switch } from 'react-router-dom';

export default function App() {
  return (
    <div className="App">
      <nav>
        <div className="title-bar">
          <h1>Secret Family Recipes</h1>
        </div>
        <div className="nav-links">
          <a href="https://hardcore-aryabhata-1f5562.netlify.app/">Home</a>
          <Link to="/">Log in / Log out</Link>
          <Link to="/signup">Sign up</Link>
          <a href="https://hardcore-aryabhata-1f5562.netlify.app/about.html">About</a>
          <Link to="/user">User Recipes</Link>
          <Link to="/recipes">Recipes</Link>
        </div>
      </nav>
      <Switch>
        <Route path="/user">
          <User />
        </Route>
        <Route path="/recipes">
          <Recipe />
        </Route>
        <Route path="/" component={Home} />
      </Switch>
      <div className="Footer">
        <p>Created by Build Week Lambda Students</p>
      </div>
    </div>
  );
}
