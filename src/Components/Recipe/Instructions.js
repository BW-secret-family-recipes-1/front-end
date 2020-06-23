import React from 'react'
import { Card, CardHeader, CardTitle, CardBody, ListGroup, ListGroupItem } from 'reactstrap'

function Instructions(props){
    return (
        <Card id='instructions' style={{backgroundColor: 'rgba(0,0,0,.2)', borderColor: 'white', color: 'white'}}>
            <CardHeader>
                <CardTitle>
                    Instructions
                </CardTitle>
            </CardHeader>
            <CardBody style={{backgroundColor: 'rgba(0,0,0,.2)', borderColor: 'white', color: 'white'}}>
                <ListGroup>
                    {props.instructions.map((instruction, index) => {
                        return (
                            <ListGroupItem style={{display: "flex", backgroundColor: 'rgba(0,0,0,.2)', borderColor: 'white', color: 'white'}}>
                                <div style={{marginRight: '10px'}}>
                                    {index+1}.
                                </div>
                                <div>{instruction}</div>
                            </ListGroupItem>
                        )
                    })}
                </ListGroup>
            </CardBody>
        </Card>
    )
}

export default Instructions