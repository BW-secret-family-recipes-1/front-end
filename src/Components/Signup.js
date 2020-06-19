
import React, { useState, useEffect } from 'react'
import * as Yup from 'yup'
import { Form, Label, Input, FormFeedback, FormGroup } from 'reactstrap'

function Signup(){
    const blank = {
        email: '',
        password: '',
        first_name: '',
        last_name: ''
    }

    const [user, setUser] = useState(blank)
    const [errors, setErrors] = useState(blank)
    const [valid, setValid] = useState(false)
    const formSchema = Yup.object().shape({
        email: Yup
            .string()
            .email()
            .required("You must provide an email address"),
        password: Yup
            .string()
            .required("Please enter a password")
            .matches(
                /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                "Must contain 8 characters, One upper case, One lower case, One number, and one special character"
            ),
        first_name: Yup
            .string()
            .min(2, "First Name must be at least two characters long")
            .required("Please enter a First Name"),
        last_name: Yup
            .string()
            .min(2, "Last Name must be at least two characters long")
            .required()
    })

    function validate(e){
        Yup.reach(formSchema, e.target.name)
        .validate(e.target.value)
        .then(valid =>{
            setErrors({
                ...errors,
                [e.target.name]: ''
            })

        })
        .catch(err =>{
            setErrors({
                ...errors,
                [e.target.name]: err.errors[0]
            })
        })
    }

    function handleChanges(e) {
        e.persist()
        validate(e)
        setUser({
            ...user, 
            [e.target.name]: e.target.value
        })
    }

    function handleSubmit(e){
        e.preventDefault()
        //todo submit
    }

    useEffect(() =>{
        formSchema.isValid(user).then(res =>{
            setValid(res)
        })
    }, [user])

    return (
    <div className="home-wrapper">
        <h2>Signup!</h2>
        <Form>
            <FormGroup>
                <Label for='email' onSubmit={handleSubmit}>
                    Email
                </Label>
                <Input type='email' id='email' name='email' value={user.email} onChange={handleChanges} valid={errors.email === ''} invalid={errors.email !== ''}/>
                <FormFeedback  valid={valid} invalid={!valid}>{errors.email}</FormFeedback>
            </FormGroup>
            <FormGroup>
                <Label for='password'>
                    Password
                </Label>
                <Input type='password' id='password' name='password' value={user.password} onChange={handleChanges} valid={errors.password === ''} invalid={errors.password !== ''}/>
                <FormFeedback valid={errors.password === ''} invalid={errors.password !== ''}>{errors.password}</FormFeedback>
            </FormGroup>
            <FormGroup>
                <Label for='first_name'>
                    First Name
                </Label>
                <Input type='text'  id='first_name' name='first_name' value={user.first_name} onChange={handleChanges} valid={errors.first_name === ''} invalid={errors.first_name !== ''}/>
                <FormFeedback valid={errors.first_name === ''} invalid={errors.first_name !== ''}>{errors.first_name}</FormFeedback>
            </FormGroup>
            <FormGroup>
                <Label for='last_name'>
                    Last Name
                </Label>
                <Input type='text' id='last_name' name='last_name' value={user.last_name} onChange={handleChanges} valid={errors.last_name === ''} invalid={errors.last_name !== ''}/>
                <FormFeedback valid={errors.last_name === ''} invalid={errors.last_name !== ''}>{errors.last_name}</FormFeedback>
            </FormGroup>
            <label htmlFor='submit'>
                <button type='submit' onClick={handleSubmit} disabled={!valid}>Sign up</button>
            </label>
        </Form>
    </div>)
}

export default Signup