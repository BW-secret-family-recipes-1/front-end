
import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Form, Label, Input } from 'reactstrap';
import LabeledInput from './LabeledInput';

const Home = (props) => {

 const [credentials, setCredentials] = useState({});
 const [isLoading, setIsLoading] = useState(false);
 const [error, setError] = useState("");
 
 const handleLogin = (e) => {
   e.preventDefault();
   setIsLoading(true);
   axios
     .post("https://secret-family-recipes1.herokuapp.com/api/auth/login", credentials)
     .then((res) => {
       setTimeout(() => {
         setIsLoading(false);
         setError("");
         localStorage.setItem("token", res.data.payload);
         props.history.push("/user");
       }, 300);
     })
     .catch((err) => {
       setIsLoading(false);
       console.log("ml: home.js: handlelogin:", err);
       setError("Invalid Credentials");
     });
     setCredentials({});
 };

 const handleChange = (e) => {
   setCredentials({
     ...credentials,
     [e.target.name]: e.target.value,
   });
 };

 return (
     
     <div className="home-wrapper">
       <h2>Log In to See Recipe's</h2>
       <h3 style={{ color: "red" }}>{error}</h3>
        {isLoading ? (<h1>Loading</h1>) : (
       <Form onSubmit={handleLogin}>
         <LabeledInput 
          text='Email' 
          name='email' 
          type='text' 
          change={handleChange} 
          value={credentials.email}
          feedback = ''
        />
        <LabeledInput 
          text='Password' 
          name='password' 
          type='password' 
          change={handleChange} 
          value={credentials.password}
          feedback=''
        />
         
         <button type="submit">Login</button>
       </Form>
     )}
   </div>
 );
};

export default Home;