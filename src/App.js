import React from 'react';
import './App.css';
import Home from './Components/Forms/Home';
import Recipe from './Components/Recipe/Recipe';
import User from './Components/User';
import { Route, Link, Switch } from 'react-router-dom';
import RecipeList from './Components/Recipe/RecipeList';
import Signup from './Components/Forms/Signup';
import PrivateRoute from './utils/PrivateRoute';

export default function App() {
  return (
    <div className="App">
      <nav className="nav">
        <div className="title-bar">
          <h1>Secret Family Recipes</h1>
        </div>
        <div className="nav-links">
          <a href="https://modest-lumiere-17a08c.netlify.app/" target="_blank">Home</a>
          <Link to="/">Log in / Log out</Link>
          <Link to="/signup">Sign up</Link>
          <a href="https://modest-lumiere-17a08c.netlify.app/about" target="_blank">About</a>
          <Link to="/recipes">Recipes</Link>
        </div>
      </nav>
      <Switch>
        <Route path='/signup'>
          <Signup />
        </Route>
        <Route path="/recipes/:recipeid">
          <Recipe />
        </Route>
        <Route path="/recipes">
          <RecipeList user='-1' recipes={[]}/>
        </Route>
        <PrivateRoute path="/user" component={User} />
        <Route path="/" component={Home} />
      </Switch>
      <div className="Footer">
        <p>Created by Build Week Lambda Students</p>
        <p>June 2020</p>
      </div>
    </div>
  );
}
