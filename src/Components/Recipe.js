import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Axios from 'axios'
import { Card, CardHeader, CardSubtitle, ListGroup, ListGroupItem, ListGroupItemText, CardBody, CardTitle, CardImg, CardImgOverlay } from 'reactstrap'
import woodimage from '../Assets/woodboard.jpg'

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
            "Cool",
            "Sint eiusmod quis in esse excepteur do exercitation qui labore. Labore nisi ea occaecat consequat. Non dolore sunt excepteur cupidatat nulla mollit qui dolore ea. Ea voluptate laborum velit sint aute. Sint eiusmod quis in esse excepteur do exercitation qui labore. Labore nisi ea occaecat consequat. Non dolore sunt excepteur cupidatat nulla mollit qui dolore ea. Ea voluptate laborum velit sint aute. Sint eiusmod quis in esse excepteur do exercitation qui labore. Labore nisi ea occaecat consequat. Non dolore sunt excepteur cupidatat nulla mollit qui dolore ea. Ea voluptate laborum velit sint aute. Sint eiusmod quis in esse excepteur do exercitation qui labore. Labore nisi ea occaecat consequat. Non dolore sunt excepteur cupidatat nulla mollit qui dolore ea. Ea voluptate laborum velit sint aute.",
            "blach",
            "blach",
            "blach",
            "blach",
            "blach",
            "blach",
            "blach",
            "blach",
            "blach",
            "blach",
            "blach",
            "blach",
            "blach",
            "blach",
            "blach",
            "blach",
            "blach",
            "blach",
            "blach",
            "blach",
            "blach",
            "blach",
            "blach",
            "blach",
            "blach",
            "blach",
            "blach"
        ]
    })
    const [scale, setScale] = useState(1)
    const [background, setBackground] = useState([]);
    const [recipeHeight, setRecipeHeight] = useState('100%');

    const params = useParams()

    useEffect(()=>{
        setRecipeHeight(
            (document.querySelector('#ingredients').offsetHeight + document.querySelector('#instructions').offsetHeight) + 50 + 'px')
            
        function handleResize() {
            setRecipeHeight(
                (document.querySelector('#ingredients').offsetHeight + document.querySelector('#instructions').offsetHeight) + 50 + 'px'
            )
        }
        window.addEventListener('resize', handleResize)
        
    }, [])
    
      useEffect(() =>{
        const count = parseInt(recipeHeight)/document.querySelector('#bkgImg').offsetHeight
                let newBackground = new Array(Math.round(count)).fill(1)
                setBackground(newBackground)
    }, [recipeHeight])
    /*
    useEffect(()=>{
        Axios.get(`dummy/${params.recipeid}`)
            .then(data =>{
                
                setRecipe(data.data);
                
            })
    }, [])//*/
    

    return (
    <Card>
        
        <CardHeader style={{backgroundColor: '#C49069'}}>
            <CardTitle>
                <h1>{recipe.title}</h1>
            </CardTitle>
            <CardSubtitle>
                originally by - {recipe.source}
            </CardSubtitle>
        </CardHeader>
        <Card style={{maxHeight: recipeHeight, overflow: 'hidden'}}>
            <CardImg id='bkgImg' src={woodimage}/>
            {background.map((flip, index) =>{

                return <CardImg src={woodimage} style={{transform: `scaleY(${index % 2 === 1 ? 1 : -1})`}}/>
            })}
            <CardImgOverlay >
        
        <Card id='ingredients' style={{backgroundColor: 'rgba(0,0,0,.2)', borderColor: 'white', color: 'white'}}>
            <CardHeader>
                Ingredients
            </CardHeader>
            <CardBody>
                <ListGroup>
                    {recipe.ingredients.map(ingredient =>{
                        return (
                            <ListGroupItem style={{backgroundColor: 'rgba(0,0,0,.2)', color: 'white', borderColor: 'white'}}>
                                {ingredient}
                            </ListGroupItem>
                        )
                    })}
                </ListGroup>
            </CardBody>
        </Card>
        <Card id='instructions' style={{backgroundColor: 'rgba(0,0,0,.2)', borderColor: 'white', color: 'white'}}>
            <CardHeader>
                <CardTitle>
                    Instructions
                </CardTitle>
            </CardHeader>
            <CardBody style={{backgroundColor: 'rgba(0,0,0,.2)', borderColor: 'white', color: 'white'}}>
                <ListGroup>
                    {recipe.instructions.map((instruction, index) => {
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
        </CardImgOverlay>
        </Card>
        
    </Card>
    )
}

export default Recipe