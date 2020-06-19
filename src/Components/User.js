import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams, Link } from 'react-router-dom'
import RecipeLink from './RecipeLink'
import { Jumbotron, Container, Card, CardImgOverlay, CardImg, Col, Row } from 'reactstrap'

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
        },
        /*{
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
        },
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
        },
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
        },
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
        }//*/
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
        <Jumbotron>
            <h1 className='display-3'>{user.first_name} {user.last_name}'s Family Recipes!</h1>
            <hr className='my-2'></hr>
            <Container>
                <Row xs='5'>
                {recipes.map(recipe =>{
                    return (
                        <Col>
                        <Card>
                            <CardImg width='100%' src={require('../Assets/cuttingboard.png')} />
                            <CardImgOverlay>
                                <Link to={`/${params.userid}/${recipe.id}`} ><RecipeLink data={recipe}/></Link>
                            </CardImgOverlay>
                        </Card>
                        </Col>
                        
                    )
                })}
                </Row>
            </Container>
        </Jumbotron>
    )
}

export default User