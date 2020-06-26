import axios from "axios";
import { axiosWithAuth } from "./axiosWithAuth";

export const SIGN_UP_START = "SIGN_UP_START";
export const SIGN_UP_SUCCESS = "SIGN_UP_SUCCESS";
export const SIGN_UP_FAILURE = "SIGN_UP_FAILURE";

export const signUp = (credentials, history) => dispatch => {
  const creds = { email: credentials.email, password: credentials.password }
  dispatch({ type: SIGN_UP_START });
  axios
    .post(
      "https://secret-family-recipes1.herokuapp.com/api/auth/register",
      creds
    )
    .then(res => {
      dispatch({ type: SIGN_UP_SUCCESS });
      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        history.push('/');
      } else {
        credentials.history.push('/login');
      }
      return true;
    })
    .catch(err => {
      dispatch({ type: SIGN_UP_FAILURE, payload: err });
      return false;
    });
};

export const LOG_IN_START = "LOG_IN_START";
export const LOG_IN_SUCCESS = "LOG_IN_SUCCESS";
export const LOG_IN_FAILURE = "LOG_IN_FAILURE";

export const logIn = (credentials, history) => dispatch => {
  dispatch({ type: LOG_IN_START });
  axios
    .post(
      "https://secret-family-recipes1.herokuapp.com/api/auth/login",
      credentials
    )
    .then(res => {
      dispatch({ type: LOG_IN_SUCCESS });
      localStorage.setItem("token", res.data.token);
      history.push('/');
      return true;
    })
    .catch(err => {
      dispatch({ type: LOG_IN_FAILURE, payload: err });
      return false;
    });
};

export const FETCH_RECIPE_START = "FETCH_RECIPE_START";
export const FETCH_RECIPE_SUCCESS = "FETCH_RECIPE_SUCCESS";
export const FETCH_RECIPE_FAILURE = "FETCH_RECIPE_FAILURE";

export const getRecipe = recipeID => dispatch => {
  dispatch({ type: FETCH_RECIPE_START });
  axiosWithAuth()
    .get(`https://secret-family-recipes1.herokuapp.com/api/recipes/${recipeID}`)
    .then(res => {
      dispatch({ type: FETCH_RECIPE_SUCCESS, payload: res.data.recipe });
    })
    .catch(err => {
      dispatch({ type: FETCH_RECIPE_FAILURE, payload: err });
    });
};

export const ADD_RECIPE_START = "ADD_RECIPE_START";
export const ADD_RECIPE_SUCCESS = "ADD_RECIPE_SUCCESS";
export const ADD_RECIPE_FAILURE = "ADD_RECIPE_FAILURE";

export const addRecipe = (newRecipe, history) => dispatch => {
  dispatch({ type: ADD_RECIPE_START });
  axiosWithAuth()
    .post("https://secret-family-recipes1.herokuapp.com/api/recipes", newRecipe)
    .then(res => {
      dispatch({ type: ADD_RECIPE_SUCCESS, payload: res.data });
      const recipe_id = res.data[res.data.length - 1].id
      history.push(`/recipes/${recipe_id}`)
    })
    .catch(err => {
      dispatch({ type: ADD_RECIPE_FAILURE, payload: err });
    });
};

export const UPDATE_RECIPE_START = "EDIT_RECIPE_START";
export const UPDATE_RECIPE_SUCCESS = "EDIT_RECIPE_SUCCESS";
export const UPDATE_RECIPE_FAILURE = "EDIT_RECIPE_FAILURE";

export const updateRecipe = (recipeID, updatedRecipe, history) => dispatch => {
  dispatch({ type: UPDATE_RECIPE_START });
  axiosWithAuth()
    .put(`https://secret-family-recipes1.herokuapp.com/api/recipes/${recipeID}`, updatedRecipe)
    .then(res => {
      dispatch({ type: UPDATE_RECIPE_SUCCESS, payload: res.data });
      const recipe_id = res.data.id
      history.push(`/recipes/${recipe_id}`)
    })
    .catch(err => {
      dispatch({ type: UPDATE_RECIPE_FAILURE, payload: err });
    });
};

export const DELETE_RECIPE_START = "DELETE_RECIPE_START";
export const DELETE_RECIPE_SUCCESS = "DELETE_RECIPE_SUCCESS";
export const DELETE_RECIPE_FAILURE = "DELETE_RECIPE_FAILURE";

export const deleteRecipe = (recipeID, history) => dispatch => {
  dispatch({ type: DELETE_RECIPE_START });
  axiosWithAuth()
    .delete(`https://secret-family-recipes1.herokuapp.com/api/recipes/${recipeID}`)
    .then(res => {
      dispatch({ type: DELETE_RECIPE_SUCCESS, payload: res.data });
      history.push('/');
    })
    .catch(err => {
      dispatch({ type: DELETE_RECIPE_FAILURE, payload: err });
    });
};

export const FETCH_TITLES_START = "FETCH_TITLES_START";
export const FETCH_TITLES_SUCCESS = "FETCH_TITLES_SUCCESS";
export const FETCH_TITLES_FAILURE = "FETCH_TITLES_FAILURE";

export const getTitles = recipeID => dispatch => {
  dispatch({ type: FETCH_TITLES_START });
  axiosWithAuth()
    .get(`https://secret-family-recipes1.herokuapp.com/api/recipes`)
    .then(res => {
      dispatch({ type: FETCH_TITLES_SUCCESS, payload: res.data });
    })
    .catch(err => {
      dispatch({ type: FETCH_TITLES_FAILURE, payload: err });
    });
};
