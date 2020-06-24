
import React, { useState } from 'react';

import React, { useState, useEffect } from 'react';
import useForm from '../../utils/hooks/useForm';
import { Form } from 'reactstrap';
import LabeledInput from './LabeledInput';
import { axiosWithAuth } from '../../utils/axiosWithAuth';

const initialValues = {
    email: '',
    password: '',
    first_name: '',
    last_name: ''
}

const Signup = ( {updateUser} ) => {

    const [credentials, setCredentials] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const addUser = (e) => {
        e.preventDefault();
        console.log(newUser)
        axiosWithAuth()
            .post('https://secret-family-recipes1.herokuapp.com/api/auth/register', newUser)
            .then(res => {
                axiosWithAuth().get('https://secret-family-recipes1.herokuapp.com/api/auth/login/')
                    .then(res => {
                        updateUser(res.data)
                    })
                    .catch(err => console.log(err))
                    console.log(res.data.payload);
            })
            .catch(err => {
                console.log(err);
            })
    };

    const [newUser, handleChange ] = useForm(initialValues);

    return (
    <div className="home-wrapper">
        <h2>Signup!</h2>
       <Form onSubmit={(e) => addUser(e)}>
            <LabeledInput 
                text='Email' 
                name='email' 
                type='text' 
                onChange={(e) => handleChange(e)}
            />
            <LabeledInput 
                text='Password' 
                name='password' 
                type='password' 
                onChange={(e) => handleChange(e)}
            />
            <LabeledInput 
                text='First Name' 
                name='first_name' 
                type='text' 
                onChange={(e) => handleChange(e)}
            />
            <LabeledInput 
                text='Last Name' 
                name='last_name' 
                type='text' 
                onChange={(e) => handleChange(e)}
            />
            <button type='submit'>Sign up</button>
        </Form>
    </div>)
}

export default Signup