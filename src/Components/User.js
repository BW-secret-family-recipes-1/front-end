import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import RecipeLink from './RecipeLink';
import { Jumbotron, Container, Card, CardImgOverlay, CardImg, Col, Row } from 'reactstrap';
import RecipeList from './RecipeList';
import { axiosWithAuth } from '../utils/axiosWithAuth';


function User(props)  {
    const params = useParams()
  
    const [user, setUser] = useState({
        id: 1,
        first_name: 'Test',
        last_name: 'User'
    })


    useEffect(() =>{
        axios.get(`dummy/${params.userid}`)
            .then(data =>{
                /*
                setUser(data.data)
                //*/
            })
    }, [])

    return (
        <Jumbotron>
            <h1 className='display-3'>{user.first_name} {user.last_name}'s Family Recipes!</h1>
            <hr className='my-2'></hr>
            <RecipeList user={user.id}/>
        </Jumbotron>
    )
}

export default User