import React, { useState, useEffect } from 'react';
import { Jumbotron } from 'reactstrap';
import { Link } from 'react-router-dom';
import RecipeList from './Recipe/RecipeList';
import { axiosWithAuth } from '../utils/axiosWithAuth';
import TagSearch from './TagSearch';


const User = ({ history }) => {

    const signOut = () => {
        localStorage.removeItem('token');
        history.push('/');
    };
  
    const [user, setUser] = useState({
        first_name: 'Test',
        last_name: 'User'
    });

    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        axiosWithAuth() 
            .get("https://secret-family-recipes1.herokuapp.com/api/auth/login")
            .then((res) => {
                console.log("ml: user.js: res: ", res.data);
                setRecipes(res.data);
            })
            .catch((err) => {
                console.group("ml: user.js: error: ", err);
            });
    }, []);

    return (
        <div className="App">
      <nav className="nav">
        <div className="title-bar">
          <h1>Secret Family Recipes</h1>
        </div>
        <div className="nav-links">
          <a href="https://modest-lumiere-17a08c.netlify.app/" target="_blank">Home</a>
          <a href="https://modest-lumiere-17a08c.netlify.app/about" target="_blank">About</a>
          <Link to="/recipes">Recipes</Link>
          <button onClick={signOut}>Sign Out</button>
        </div>
      </nav>
        <Jumbotron>
            <h1 className='display-3'>{user.first_name} {user.last_name}'s Family Recipes!</h1>
            <hr className='my-2'></hr>
            <TagSearch />
            <RecipeList />
        </Jumbotron>
        <div className="Footer">
        <p>Created by Build Week Lambda Students</p>
        <p>June 2020</p>
      </div>
    </div>
    )
}

export default User