import React, { useEffect, useState } from 'react'
import LabeledInput from './LabeledInput'
import { Form } from 'reactstrap'



function ObjectForm({object, change, submit, errors, types, action}){

    const [inputs, setInputs] = useState([])

    useEffect(()=>{
        let newInputs = []
        for( const prop in object){
            let text = prop.split('_')
            text = text.map(word => {
                return word.charAt(0).toUpperCase() + word.slice(1) + ' '
            });
            text = text.reduce((res, val) =>{
                return res = res + val
            }, " ")
            if(prop !== 'id')
            {
            newInputs.push(
                <LabeledInput 
                    text= {text}
                    name= {prop}
                    type= {types[prop]}
                    change={change}
                    value={object[prop]}
                    feedback={errors[prop]}
                />
            )
            }
        }
        setInputs(newInputs)
    }, [object])

    return (
        <Form onSubmit={(e) => e.preventDefault()}>
            {
                inputs.map(input => input)
            }
            {
                action.map(button =>{
                    return <button type='submit' onClick={button.submit} disabled={Object.values(errors).filter(val => val !== '').length > 0}>{button.text}</button>
                })
                
            }
        </Form>
    )
}

export default ObjectForm