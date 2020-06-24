import { useState } from "react";
import * as yup from "yup";

export default function useForm(initialValues, formSchema) {
    const [values, setValues] = useState(initialValues);
    const [errors, setErrors] = useState(initialValues);

    const handleChanges = e => {
        if(e.target.name !== "user") e.persist();

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