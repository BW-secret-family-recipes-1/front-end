

import React, { useState, useEffect } from 'react';
import useForm from '../../utils/hooks/useForm';
import { useDispatch, useSelector } from "react-redux";
import { Form } from 'reactstrap';
import LabeledInput from './LabeledInput';
import { getToken } from '../../Components/Forms/Home';
import * as Yup from 'yup'
import ObjectForm from './ObjectForm'
import { useHistory } from 'react-router-dom'

const initialValues = {
    email: '',
    password: '',
    first_name: '',
    last_name: ''
}

const Signup = props => {
    const [user, setUser] = useState(blank)
    const [errors, setErrors] = useState(blank)
    const [valid, setValid] = useState(false)
    const history = useHistory()
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
        <ObjectForm
            object={user}
            change={handleChanges}
            submit={handleSubmit}
            errors={errors}
            types={{
                email: 'text',
                password: 'password',
                first_name: 'text',
                last_name: 'text'
            }}
            action= {[{text: 'Sign Up!', action: handleSubmit}]}
        />
            
    </div>)
}

export default Signup