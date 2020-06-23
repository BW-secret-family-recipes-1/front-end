import React from 'react'
import { Card, CardHeader, CardBody, ListGroup, ListGroupItem } from 'reactstrap'

function Ingredients(props){
    return (
        <Card id='ingredients' style={{backgroundColor: 'rgba(0,0,0,.2)', borderColor: 'white', color: 'white'}}>
            <CardHeader>
                Ingredients
            </CardHeader>
            <CardBody>
                <ListGroup>
                    {props.ingredients.map(ingredient =>{
                        return (
                            <ListGroupItem style={{backgroundColor: 'rgba(0,0,0,.2)', color: 'white', borderColor: 'white'}}>
                                {ingredient}
                            </ListGroupItem>
                        )
                    })}
                </ListGroup>
            </CardBody>
        </Card>
    )
}

export default Ingredients