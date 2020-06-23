
import React, { useState, useEffect } from 'react'
import * as Yup from 'yup'
import { Form } from 'reactstrap'
import LabeledInput from './LabeledInput'

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
            <LabeledInput 
                text='Email' 
                name='email' 
                type='text' 
                change={handleChanges} 
                value={user.email} 
                feedback = {errors.email}
            />
            <LabeledInput 
                text='Password' 
                name='password' 
                type='password' 
                change={handleChanges} 
                value={user.password}
                feedback = {errors.password}
            />
            <LabeledInput 
                text='First Name' 
                name='first_name' 
                type='text' 
                change={handleChanges} 
                value={user.first_name}
                feedback = {errors.first_name}
            />
            <LabeledInput 
                text='Last Name' 
                name='last_name' 
                type='text' 
                change={handleChanges} 
                value={user.last_name}
                feedback = {errors.last_name}
            />
            <button type='submit' onClick={handleSubmit} disabled={!valid}>Sign up</button>
        </Form>
    </div>)
}

export default Signup