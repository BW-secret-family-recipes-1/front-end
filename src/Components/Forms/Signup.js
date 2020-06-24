
import React, { useState, useEffect } from 'react';
import useForm from '../../utils/hooks/useForm';
import { useDispatch, useSelector } from "react-redux";
import { Form } from 'reactstrap';
import LabeledInput from './LabeledInput';
import { getToken } from '../../Components/Forms/Home';

const initialValues = {
    email: '',
    password: '',
    first_name: '',
    last_name: ''
}

const Signup = props => {

    const dispatch = useDispatch();
    const { isFetching, error } = useSelector(state => state.login);
    const [loginError, setLoginError] = useState("");
    const [values, handleChanges, formErrors] = useForm(initialValues);

    const handleSubmit = (e) => {
        e.preventDefault();

        const newData = {
            email: values.email,
            password: values.password,
            first_name: values.first_name,
            last_name: values.last_name
        };
        console.log("ml: signup.js: handlesubmit: ", newData);
        dispatch(getToken(newData));
    };

    useEffect(() => {
        if('https://secret-family-recipes1.herokuapp.com/api/auth/register'.getItem("token")) {
            const userData = JSON.parse
            ('https://secret-family-recipes1.herokuapp.com/api/auth/register'.getItem("user"));
        } else {
            setLoginError("Please fill out all fields");
            'https://secret-family-recipes1.herokuapp.com/api/auth/register'.removeItem("token");
            'https://secret-family-recipes1.herokuapp.com/api/auth/register'.removeItem("user");
        }
    },

    [dispatch, isFetching, props.history]) ;

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