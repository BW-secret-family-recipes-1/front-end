import React, { useState } from 'react'

function Home(){
    const blank = {
        email: '',
        password: '',
        first_name: '',
        last_name: ''
    }

    const [user, setUser] = useState(blank)

    function handleChanges(e) {
        setUser({...user, [e.target.name]: e.target.value})
    }

    return (
    <div>
        <form>
            <label htmlFor='email'>
                Email
                <input type='email' id='email' name='name' value={user.email}/>
            </label>
            <label htmlFor='password'>
                Password
                <input type='password' id='password' name='password' value={user.password}/>
            </label>
            <label htmlFor='first_name'>
                First Name
                <input type='text'  id='first_name' name='first_name' value={user.first_name}/>
            </label>
            <label htmlFor='last_name'>
                Last Name
                <input type='text' id='last_name' name='last_name' value={user.last_name}/>
            </label>
            <label htmlFor='submit'>
                <button type='submit'>Login</button>
            </label>
        </form>
    </div>)
}

export default Home