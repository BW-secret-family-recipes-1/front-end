import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Card, CardImg, CardImgOverlay } from 'reactstrap'
import { Link } from 'react-router-dom'
import RecipeLink from './RecipeLink'

function RecipeList(props){
    
    const blank = [
        {
            user: 1,
            id: 1,
            title: 'Rice Crispie Treats 1',
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
        },
        {
            user: 2,
            id: 1,
            title: 'Rice Crispie Treats 2',
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
        },
        {
            user: 3,
            id: 1,
            title: 'Rice Crispie Treats 3',
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
        },
        {
            user: 4,
            id: 1,
            title: 'Rice Crispie Treats 4',
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
        },
        {
            user: 5,
            id: 1,
            title: 'Rice Crispie Treats 5',
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
        }//*/
    ]
    const [recipes, setRecipes] = useState(blank)

    useEffect(() =>{
        setRecipes(blank)
        if(props.user !== '-1'){
            setRecipes(recipes.filter(u => u.user === Number(props.user)))
        }
    }, [props.user])

    return (
        <Container>
                <Row xs='5'>
                {recipes.map(recipe =>{
                    return (
                        <Col>
                        <Card>
                            <CardImg width='100%' src={require('../Assets/cuttingboard.png')} />
                            <CardImgOverlay>
                                <Link to={`/recipes/${recipe.id}`} ><RecipeLink data={recipe}/></Link>
                            </CardImgOverlay>
                        </Card>
                        </Col>
                        
                    )
                })}
                </Row>
            </Container>
    )
}

export default RecipeList