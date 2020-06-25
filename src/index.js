import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
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

ReactDOM.render(
      <Provider store={store}>
        <Router>
        <Switch>
        <Route path='/signup'>
          <Signup />
        </Route>
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
      </Provider>,
  document.getElementById('root')
);
