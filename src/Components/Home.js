
import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Form, Label, Input } from 'reactstrap';

const Home = (props) => {

 // make a post request to retrieve a token from the api
 const [credentials, setCredentials] = useState({});
 const [isLoading, setIsLoading] = useState(false);
 const [error, setError] = useState("");
 // when you have handled the token, navigate to the BubblePage route
 const handleLogin = (e) => {
   e.preventDefault();
   setIsLoading(true);
   axios
     .post("", credentials)
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
       <p>{`Admin: email: testing@email.com password: i<3Lambd4`}</p>
       <h3 style={{ color: "red" }}>{error}</h3>
        {isLoading ? (<h1>Loading</h1>) : (
       <Form onSubmit={handleLogin}>
         <Label>
             Email
             <Input
           type="text"
           placeholder="email"
           name="email"
           value={credentials.email}
           onChange={handleChange}
         />
         </Label>
         <Label>
            Password:
             <Input
           type="password"
           placeholder="Password"
           name="password"
           value={credentials.password}
           onChange={handleChange}
         />
         </Label>
         <button type="submit">Login</button>
       </Form>
     )}
   </div>
 );
};

export default Home;