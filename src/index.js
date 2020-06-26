import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { Provider } from 'react-redux';
import Home from './Components/Forms/Home';
import User from './Components/User';
import AddRecipe from './Components/AddRecipe';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
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
            <PrivateRoute exact path="/add-recipe" component={AddRecipe} />
            <PrivateRoute exact path="/" component={User} />
            <Route path="/login" component={Home} />
          </Switch>
        </Router>
      </Provider>,
  document.getElementById('root')
);
