import React, { useState, useEffect } from 'react'
import { Label, Input, FormGroup, FormFeedback } from 'reactstrap'

function LabeledInput({ text, name, type, change, value, feedback }){

    const [valid, setValid] = useState(feedback === '')

    useEffect(()=>{
      setValid(feedback === '')
    }, [feedback])

    return (
        <FormGroup for={name} >
        <Label  style={{width: '100%'}}>
            {text}:
             <Input  style={{width: '100%'}}
           type={type}
           placeholder={text}
           name={name}
           value={value}
           onChange={change}
           id={name}
           valid={valid ? true : false}
           invalid={valid ? false : true}
         />
         <FormFeedback valid={valid ? true : false} invalid={valid ? false : true}>{feedback}</FormFeedback>
         </Label>
         </FormGroup>
    )
}

export default LabeledInput