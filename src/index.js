import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import thunk from 'redux-thunk';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import PrivateRoute from './utils/PrivateRoute';
import rootReducer from './utils/reducers'
import Dashboard from './Components/Dashboard';
import AddRecipe from './Components/Recipe/AddRecipe';
import Registration from './Components/Registration';
import Login from './Components/Login';
import SingleRecipe from './Components/SingleRecipe';
import UpdateRecipe from './Components/Recipe/UpdateRecipe';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Switch>
        <PrivateRoute exact path='/' component={Dashboard} />
        <Route path='/login' component={Login} />
        <Route path='/registration' component={Registration} />
        <PrivateRoute path='/recipes/view/:id' component={SingleRecipe} />
        <PrivateRoute path='/recipes/edit/:id' component={UpdateRecipe} />
        <PrivateRoute path='/add-recipe' component={AddRecipe} />
      </Switch>
    </Router>
  </Provider>,
  document.getElementById('root')
);