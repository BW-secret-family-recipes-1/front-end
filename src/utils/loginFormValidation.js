import * as yup from "yup";

export const loginFormSchema = yup.object().shape({
    email: yup
            .string()
            .email("Please enter a valid email address.")
            .required("Please enter an email address"),
    password: yup
                .string()
                .min(6, "Password enter a password at least 6 characters long")
                .required("Please enter a password")
                
});

export const registerFormSchema = yup.object().shape({
    firstame: yup.string().required("Please enter your First Name."),
    lastName: yup.string().required("Please enter your Last Name."),
    email: yup
            .string()
            .email("Please enter a valid email address.")
            .required("Please enter an email address"),
    password: yup
                .string()
                .min(6, "Please enter a password at least 6 characters long.")
                .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%&])(?=.{6,})/, "Password must containe at least one Uppercase letter, one Lowercase letter, one number, or one of the following symbols: ! @ # $ % &")
                .required("Please enter a password"),
    
});