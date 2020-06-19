import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Axios from 'axios'
import { Card, CardHeader, CardSubtitle, ListGroup, ListGroupItem, ListGroupItemText, CardBody, CardTitle } from 'reactstrap'

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
    <Card>
        <CardHeader>
            <CardTitle>
                {recipe.title}
            </CardTitle>
            <CardSubtitle>
                originally by - {recipe.source}
            </CardSubtitle>
        </CardHeader>
        <Card>
            <CardHeader>
                Ingredients
            </CardHeader>
            <CardBody>
                <ListGroup>
                    {recipe.ingredients.map(ingredient =>{
                        return (
                            <ListGroupItem>
                                {ingredient}
                            </ListGroupItem>
                        )
                    })}
                </ListGroup>
            </CardBody>
        </Card>
        <Card>
            <CardHeader>
                <CardTitle>
                    Instructions
                </CardTitle>
            </CardHeader>
            <CardBody>
                <ListGroup>
                    {recipe.instructions.map((instruction, index) => {
                        return (
                            <ListGroupItem>
                                {index+1}. {instruction}
                            </ListGroupItem>
                        )
                    })}
                </ListGroup>
            </CardBody>
        </Card>
    </Card>
    )
}

export default Recipe