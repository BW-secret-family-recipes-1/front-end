import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams, Link } from 'react-router-dom'
import RecipeLink from './RecipeLink'

function User(props){

    const params = useParams()

    const [user, setUser] = useState({
        first_name: 'Test',
        last_name: 'User'
    })
    const [recipes, setRecipes] = useState([
        {
            id: 1,
            title: 'Rice Crispie Treats',
            source: 'Meemaw',
            ingredients: [
                "Rice Crispies",
                "Marshmallows"
            ],
            instructions: [
                "Melt the Marshmallows",
                "Add the Rice Crispies",
                "Stir",
                "Cool"
            ]
        }
    ])

    useEffect(() =>{
        axios.get(`dummy/${params.userid}`)
            .then(data =>{
                /*
                setUser(data.data)
                //*/
            })
    }, [])

    return (
        <div>
            <h1>{user.first_name} {user.last_name}'s Family Recipes!</h1>
            <div>
                {recipes.map(recipe =>{
                    return <Link to={`/${params.userid}/${recipe.id}`} ><RecipeLink data={recipe}/></Link>
                })}
            </div>
        </div>
    )
}

export default User