import React from 'react';
import './App.css';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { Provider } from 'react-redux';
import Home from './Components/Forms/Home';
import Recipe from './Components/Recipe/Recipe';
import User from './Components/User';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import RecipeList from './Components/Recipe/RecipeList';
import Signup from './Components/Forms/Signup';
import PrivateRoute from './utils/PrivateRoute';
import rootReducer from "./utils/reducers";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk, logger))
);

export default function App() {
  return (
    <div className="App">
      <nav className="nav">
        <div className="title-bar">
          <h1>Secret Family Recipes</h1>
        </div>
        <div className="nav-links">
          <a href="https://modest-lumiere-17a08c.netlify.app/" target="_blank">Home</a>
          <Link to="/">Log in</Link>
          <Link to="/signup">Sign up</Link>
          <a href="https://modest-lumiere-17a08c.netlify.app/about" target="_blank">About</a>
          <Link to="/recipes">Recipes</Link>
        </div>
      </nav>
      <Provider store={store}>
        <Router>
        <Switch>
        <Route path='/signup' component={Signup} />
        <Route path="/recipes/:recipeid">
          <Recipe />
        </Route>
        <Route path="/recipes">
          <RecipeList user='-1' />
        </Route>
        <PrivateRoute path="/user" component={User} />
        <Route path="/" component={Home} />
      </Switch>
        </Router>
      </Provider>
      <div className="Footer">
        <p>Created by Build Week Lambda Students</p>
        <p>June 2020</p>
      </div>
    </div>
  );
}
