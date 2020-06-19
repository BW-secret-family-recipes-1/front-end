import React from 'react'

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
    <div>
        <form style={{display: 'flex', flexDirection: 'column'}}>
            <label htmlFor='email' onSubmit={handleSubmit}>
                Email
                <input type='email' id='email' name='email' value={user.email} onChange={handleChanges}/>
                <p>{errors.email}</p>
            </label>
            <label htmlFor='password'>
                Password
                <input type='password' id='password' name='password' value={user.password} onChange={handleChanges}/>
                <p>{errors.password}</p>
            </label>
            <label htmlFor='first_name'>
                First Name
                <input type='text'  id='first_name' name='first_name' value={user.first_name} onChange={handleChanges}/>
                <p>{errors.first_name}</p>
            </label>
            <label htmlFor='last_name'>
                Last Name
                <input type='text' id='last_name' name='last_name' value={user.last_name} onChange={handleChanges}/>
                <p>{errors.last_name}</p>
            </label>
            <label htmlFor='submit'>
                <button type='submit' onClick={handleSubmit} disabled={!valid}>Login</button>
            </label>
        </form>
    </div>)
}

export default Signup