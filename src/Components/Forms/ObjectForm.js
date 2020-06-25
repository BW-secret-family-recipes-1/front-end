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
            if(prop !== 'id' && prop !== 'passwordMatch')
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
    }, [object, errors])

    return (
        <Form onSubmit={(e) => {e.preventDefault(); submit(e)}}>
            {
                inputs.map(input => input)
            }
            <div style={{width: '50%', margin: 'auto 25%', textAlign: 'center'}}>
                {
                    action.map(button =>{
                        return <button type='submit' onClick={button.action} disabled={Object.values(errors).filter(val => val !== '').length > 0}>{button.text}</button>
                    })
                    
                }
            </div>
        </Form>
    )
}

export default ObjectForm