import React from 'react'
import { Label, Input, FormGroup, FormFeedback } from 'reactstrap'

function LabeledInput({ text, name, type, change, value, feedback }){
    return (
        <FormGroup for={name}  style={{width: '50%', margin: 'auto 25%'}}>
        <Label  style={{width: '100%'}}>
            {text}:
             <Input  style={{width: '100%'}}
           type={type}
           placeholder={text}
           name={name}
           value={value}
           onChange={change}
           id={name}
           valid={feedback === '' ? true : false}
           invalid={feedback === '' ? false : true}
         />
         <FormFeedback valid={feedback === '' ? true : false} invalid={feedback === '' ? false : true}>{feedback}</FormFeedback>
         </Label>
         </FormGroup>
    )
}

export default LabeledInput