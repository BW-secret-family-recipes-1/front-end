import { useState } from "react";
import * yup from "yup";

export default function useForm(initialValues, formSchema) {
    const [user, setUser] = useState(initialValues);
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

        setUser({
            ...user,
            [e.target.name]: e.target.name === "user" ? [e.target.user] : e.target.user
        });
    }
    const clearForm = () => {
        setUser(initialValues);
    }

    return [values, handleChanges, formErrors, clearForm];
}
}