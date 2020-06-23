import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Axios from 'axios'
import { Card, CardHeader, CardSubtitle, CardTitle, CardImgOverlay, CardImg } from 'reactstrap'
import woodimage from '../../Assets/woodboard.jpg'
import Instructions from './Instructions'
import Ingredients from './Ingredients'

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
                <Ingredients ingredients={recipe.ingredients} />
                <Instructions instructions={recipe.instructions} /> 
            </CardImgOverlay>
        </Card>
        
    </Card>
    )
}

export default Recipe