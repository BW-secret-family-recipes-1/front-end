
import { useState, useEffect } from "react";
import * as yup from "yup";
import { axiosWithAuth } from '../../utils/axiosWithAuth';

export default function useForm(initialValues, formSchema) {
    const [values, setValues] = useState(initialValues);
    const [errors, setErrors] = useState(initialValues);

    const [newUser, setNewUser] = useState({
        email: '',
        password: '',
        first_name: '',
        last_name: ''
    });
    useEffect(() => {
        axiosWithAuth()
          .get(`https://secret-family-recipes1.herokuapp.com/api/auth/register`)
          .then(res => {
            setUser(res.data)
          })
      }, [])
    
      const handleChange = (e) => {
        setNewUser({...newUser, [e.target.name]: e.target.value})
    };

        yup.reach(formSchema, e.target.name)
        .validate(e.target.value)
        .then(valid =>{
            setErrors({
                ...errors,
                [e.target.name]: ""
            });
        })
        .catch(err =>{
            setErrors({
                ...errors,
                [e.target.name]: err.errors[0]
            });
        });

        setValues({
            ...values,
            [e.target.name]: e.target.name === "user" ? [e.target.user] : e.target.user
        });
    }
    const clearForm = () => {
        setValues(initialValues);
    }

    return [values, handleChanges, errors, clearForm, setValues];
}