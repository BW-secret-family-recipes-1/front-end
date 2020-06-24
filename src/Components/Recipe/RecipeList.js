import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, CardImg, CardHeader, CardImgOverlay, CardBody, CardSubtitle } from 'reactstrap';
import { Link, useHistory } from 'react-router-dom';
import { axiosWithAuth } from '../../utils/axiosWithAuth';
import cuttingboard from '../../Assets/cuttingboard.png'
import ObjectForm from '../Forms/ObjectForm';
import * as Yup from 'yup'
import useForm from '../../utils/hooks/useForm';

const initialRecipe = {
    title:"", 
    source:"", 
    ingredients:"", 
    instructions: "", 
    category:""
}

const RecipeList = ( {updateRecipes}) => {
    const history = useHistory();

    const [recipes, setRecipes] = useState([
      {title: 'Recipe 1', source: 'meemaw', ingredients: '', instructions: '', category: 'chicken', id: 1},
      {title: 'Recipe 1', source: 'meemaw', ingredients: '', instructions: '', category: 'chicken', id: 1},
      {title: 'Recipe 1', source: 'meemaw', ingredients: '', instructions: '', category: 'chicken', id: 1},
      {title: 'Recipe 1', source: 'meemaw', ingredients: '', instructions: '', category: 'chicken', id: 1},
      {title: 'Recipe 1', source: 'meemaw', ingredients: '', instructions: '', category: 'chicken', id: 1}
    ]);

    console.log("ml: recipelist.js: ", recipes);
    const [editing, setEditing] = useState(false);
    const [clicked, setClicked] = useState({})
    const [add, setAdd] = useState(false)

    {/* I'm terrible at regex... tried to come up with a regex for an ingredient pattern, but failed */}
    const recipeSchema = Yup.object().shape({
      title: Yup
        .string()
        .required('Must enter a recipe title')
        .min(2, 'Recipe Title must be at least two characters long'),
      source: Yup
        .string()
        .required('Please enter a source for this recipe'),
        
      ingredients: Yup
        .string()
        .required('Please enter at least one ingredient')
        .min(2),
      instructions: Yup
        .string()
        .required('Please enter at least one instruction')
        .min(2),
      category: Yup
        .string()
        .required('Please enter a category for your recipe')
        .min(2)
    })

    const [newRecipe, newRecipeChange, newRecipeErrors, newRecipeClear, setNewRecipe] = useForm(
      initialRecipe,
      recipeSchema
    )

    const [recipeToEdit, recipeToEditChange, recipeToEditErrors, recipeToEditClear, setRecipeToEdit] = useForm(
      initialRecipe,
      recipeSchema
    )

    const editRecipe = (recipe) => {
        setRecipeToEdit(recipe)
        setClicked({})
        setEditing(true);
    };
    const recipeClicked = recipe => {
      if(!editing){
        setClicked(clicked === recipe ? {} : recipe);
      }
    }

    useEffect(() => {
      axiosWithAuth()
        .get(`https://xh84o.sse.codesandbox.io/api/recipes/`)
        .then(res => {
          setRecipes(res.data)
        })
    }, [])

    const saveEdit = e => {
        e.preventDefault();
        
        setEditing(false)
        console.log("ml: recipelist.js: saveEdit: ", recipeToEdit)
        axiosWithAuth()
            .put(`https://xh84o.sse.codesandbox.io/api/recipes/`, recipeToEdit)
            .then(res => {
                console.log("ml: recipelist.js: saveEdit: res:", res)
                console.log("ml: recipelist.js: saveEdit: res.data: ", res.data);
                axiosWithAuth().get('https://xh84o.sse.codesandbox.io/api/recipes/')
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
            .delete(`https://secret-family-recipes1.herokuapp.com/api/recipes/`, recipe)
            .then(res => {
                console.log("ml: recipelist.js: deleteRecipe: res: ", res);
                console.log("ml: recipelist.js: deleteRecipe: res.data: ", res.data);
                axiosWithAuth().get('https://secret-family-recipes1.herokuapp.com/api/recipes/')
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
            .post('https://secret-family-recipes1.herokuapp.com/api/recipes/', newRecipe)
            .then(res => {
                axiosWithAuth().get('https://secret-family-recipes1.herokuapp.com/api/recipes/')
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

    

    return (
    <div className="recipe-wrapper">
      <div className="recipe-list">
        <h1>Recipes</h1>
        <button onClick={()=> setAdd(true)}>Add New Recipe</button>
        {add && (
          <div className="recipe-add">
            <legend style={{width: '50%', margin: 'auto 25%'}}>Add New Recipe</legend>
            <ObjectForm
              object={newRecipe}
              change={newRecipeChange}
              submit={addRecipe}
              errors={newRecipeErrors}
              types={{
                title: 'text',
                source: 'text',
                ingredients: 'textarea',
                instructions: 'textarea',
                category: 'text'
              }}
              action={[
                {
                  text: 'Save',
                  submit: addRecipe
                }, 
                {
                  text: 'Cancel', 
                  submit: ()=> setAdd(false)
                }
              ]}
            />
          </div>
        )}
        {editing && (
          <div className='edit'>
            <legend style={{width: '50%', margin: 'auto 25%'}}>Edit Recipe</legend>
              <ObjectForm 
                object={recipeToEdit}
                change={recipeToEditChange}
                submit={saveEdit}
                errors={recipeToEditErrors}
                types={{
                  title: 'text',
                  source: 'text',
                  ingredients: 'textarea',
                  instructions: 'textarea',
                  category: 'text'
                }}
                action={[
                  {
                    text: 'Save', 
                    submit: saveEdit
                  }, 
                  {
                    text: 'Cancel', 
                    submit: ()=> setEditing(false)
                  }
                ]}
              />
          </div>
        )}
        <Container>
        <Row sm='5'>
        {recipes.map(recipe => (
          <Col>
          <Card onClick={(e) => { 
            e.stopPropagation()
            recipeClicked(recipe)}}>
            <CardImg src={cuttingboard} />
            <CardImgOverlay>
              <CardHeader style={{'paddingBottom': '0px'}}>
                <h3>{recipe.title}</h3>
              </CardHeader>
              <CardBody>
                <p>By {recipe.source}</p>
                <p>Category: {recipe.category}</p>
              </CardBody>
              <CardSubtitle>
              {clicked === recipe && (
              <div style={{display: 'flex', justifyContent: 'space-evenly', alignItems: 'center'}}>
                <Link to={`/recipes/${recipe.id}`}><button type='submit'>View</button></Link>
                <button className='' type='submit' onClick={()=> editRecipe(recipe)}>Edit</button>
                <button className='delete' onClick={e => {
                  e.stopPropagation()
                  deleteRecipe(recipe)
                }}>Delete</button>
              </div>
            )}
              </CardSubtitle>
            </CardImgOverlay>
          </Card>
          </Col>
          
        ))}
        
        </Row>
      </Container>
      </div>
    </div>
    )
};

export default RecipeList;