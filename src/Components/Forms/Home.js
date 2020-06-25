
import React, { useState } from 'react'
import axios from 'axios';
import ObjectForm from './ObjectForm';

const Home = (props) => {


 const [credentials, setCredentials] = useState({
   email: '',
   password: ''
 });
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
       <h3 cy-data='error' style={{ color: "red" }}>{error}</h3>
        {isLoading ? (<h1>Loading</h1>) : (
          <ObjectForm 
            object={credentials}
            change={handleChange}
            submit={handleLogin}
            errors={{
              email: '',
              password: ''
            }}
            types={{
              email: 'text',
              password: ''
            }}
            action={[
              {
                text: 'Login',
                action: handleLogin
              }
            ]} 
          />
     )}
   </div>
 );
};

export default Home;