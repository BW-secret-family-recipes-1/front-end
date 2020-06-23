import React from 'react'
import { CardImg } from 'reactstrap'
import woodimage from '../../Assets/woodboard.jpg'

function Background({ background }){
    return (
        <>
        <CardImg id='bkgImg' src={woodimage}/>
            {background.map((flip, index) =>{
                return <CardImg src={woodimage} style={{transform: `scaleY(${index % 2 === 1 ? 1 : -1})`}}/>
            })}
        </>
    )
}

export default Background