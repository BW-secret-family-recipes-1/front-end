import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Axios from 'axios'

function Recipe(props){
    const [recipe, setRecipe] = useState({
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
    })
    const params = useParams()

    useEffect(()=>{
        Axios.get(`dummy/${params.recipeid}`)
            .then(data =>{
                /*
                setRecipe(data.data);
                //*/
            })
    })

    return (
    <div>
        <h1>{recipe.title}</h1>
        <h2>originally by - {recipe.source}</h2>
        <div style={{borderBottom: '1px solid black'}}>
            <ul>
                {recipe.ingredients.map(ingredient =>{
                    return <li>{ingredient}</li>
                })}
            </ul>
        </div>
        <div>
            <ol>
                {recipe.instructions.map(instruction => {
                    return <li>{instruction}</li>
                })}
            </ol>
        </div>
    </div>
    )
}

export default Recipe