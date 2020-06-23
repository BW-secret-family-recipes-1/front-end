import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, CardImg, CardImgOverlay } from 'reactstrap';
import { Link, useRouteMatch, useHistory } from 'react-router-dom';
import RecipeLink from './RecipeLink';
import axios from "axios";
import { axiosWithAuth } from '../../utils/axiosWithAuth';

const initialRecipe = {
    title:"", 
    source:"", 
    ingredients:"", 
    instructions: "", 
    category:""
}

const RecipeList = ({ recipes, updateRecipes}) => {
    const match = useRouteMatch();
    const history = useHistory();
    console.log("ml: recipelist.js: ", recipes);
    const [editing, setEditing] = useState(false);
    const [recipeToEdit, setRecipeToEdit] = useState(initialRecipe);
    const [newRecipe, setNewRecipe] = useState({
        title:"", 
        source:"", 
        ingredients:"", 
        instructions: "", 
        category:""
    });

    const editRecipe = recipe => {
        setEditing(true);
        setRecipeToEdit(recipe);
    };

    const saveEdit = e => {
        e.preventDefault();
        console.log("ml: recipelist.js: saveEdit: ", recipeToEdit)
        axiosWithAuth()
            .put(``, recipeToEdit)
            .then(res => {
                console.log("ml: recipelist.js: saveEdit: res:", res)
                console.log("ml: recipelist.js: saveEdit: res.data: ", res.data);
                axiosWithAuth().get('')
                    .then(res => {
                        updateRecipes(res.data)
                    })
                    .catch(err => console.log("ml: recieplist.js: saveEdit: err: ", err))
                    console.log("ml: recipelist.js: saveEdit: err payload: ", res.data.payload);
                    history.push (`/`)
            })
            .catch(err => {
                console.group("ml: recipelist.js: saveEdit: err inside catch: ", err);
            })
    };

    const deleteRecipe = recipe => {
        axiosWithAuth()
            .delete(``, recipe)
            .then(res => {
                console.log("ml: recipelist.js: deleteRecipe: res: ", res);
                console.log("ml: recipelist.js: deleteRecipe: res.data: ", res.data);
                axiosWithAuth().get('')
                    .then(res => {
                        updateRecipes(res.data)
                    })
                    .catch(err => console.log("ml: receipelist.js: deleteRecipe: catch err", err))
                    console.log("ml: recipelist: deleteRecipe: catch payload: ", res.data.payload);
                    history.push('/')
            })
            .catch(err => {
                console.log("ml: recipelist.js: deleteRecipe: err inside catch: ", err);
            })
    };

    const addRecipe = (e) => {
        e.preventDefault();
        console.log("ml: recipelist.js: addRecipe: ", newRecipe)
        axiosWithAuth()
            .post('', newRecipe)
            .then(res => {
                axiosWithAuth().get('')
                    .then(res => {
                        updateRecipes(res.data)
                    })
                    .catch(err => console.log("ml: recipelist.js: addRecip: post err: ", err))
                    console.log("ml: recipelist.js: addRecipe: res.data.payload: ", res.data.payload);
            })
            .catch(err => {
                console.log("ml: receipelist.js: addRecipe: catch err: ", err);
            })
    };

    const handleChange = (e) => {
        setNewRecipe({...newRecipe, [e.target.name]: e.target.value})
    };

    return (
        <div className="recipe-wrapper">
      <div className="recipe-list">
      <p>Recipes</p>
      <ul>
        {recipes.map(recipe => (
          <li key={recipe.title} onClick={() => editRecipe(recipe)}>
            <span>
              <span className="delete" onClick={e => {
                    e.stopPropagation();
                    deleteRecipe(recipe)
                  }
                }>
                  x
              </span>{" "}
              {recipe.title}
            </span>
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>Edit Recipe</legend>
          <label>
            Recipe Title:
            <input
              onChange={e =>
                setRecipeToEdit({ ...recipeToEdit, title: e.target.value })
              }
              value={recipeToEdit.title}
            />
          </label>
          <label>
            Source:
            <input
              onChange={e =>
                setRecipeToEdit({ ...recipeToEdit, source: e.target.value })
              }
              value={recipeToEdit.source}
            />
          </label>
          <label>
            Ingredients:
            <input
              onChange={e =>
                setRecipeToEdit({ ...recipeToEdit, ingredients: e.target.value })
              }
              value={recipeToEdit.ingredients}
            />
          </label>
          <label>
            Intructions:
            <input
              onChange={e =>
                setRecipeToEdit({ ...recipeToEdit, instructions: e.target.value })
              }
              value={recipeToEdit.instructions}
            />
          </label>
          <label>
            Category:
            <input
              onChange={e =>
                setRecipeToEdit({ ...recipeToEdit, category: e.target.value })
              }
              value={recipeToEdit.category}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      </div>
      <div className="spacer" />
      <div className="recipe-add">
      <form onSubmit={(e) => addRecipe(e)}>
        <p>Add Recipe</p>
        <p>Title:</p>
        <input
          type='text'
          name='title'
          onChange={(e) => handleChange(e)}
        />
        <p>Source:</p>
        <input
          type='text'
          name='source'
          onChange={(e) => handleChange(e)}
        />
        <p>Ingredients:</p>
        <input
          type='text'
          name='ingredients'
          onChange={(e) => handleChange(e)}
        />
        <p>Instructions:</p>
        <input
          type='text'
          name='instructions'
          onChange={(e) => handleChange(e)}
        />
        <p>Category:</p>
        <input
          type='text'
          name='category'
          onChange={(e) => handleChange(e)}
        />
        <p></p>
        <button>Add Recipe</button>
      </form>
      </div>
    </div>
    )
};

export default RecipeList;