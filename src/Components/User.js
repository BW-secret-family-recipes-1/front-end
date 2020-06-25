import React, { useState, useEffect } from 'react';
import { Jumbotron } from 'reactstrap';
import RecipeList from './Recipe/RecipeList';
import { axiosWithAuth } from '../utils/axiosWithAuth';


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
        <Jumbotron>
            <h1 className='display-3'>{user.first_name} {user.last_name}'s Family Recipes!</h1>
            <hr className='my-2'></hr>
            <button onClick={signOut}>Sign Out</button>
            <RecipeList user={user.id}/>
        </Jumbotron>
    )
}

export default User