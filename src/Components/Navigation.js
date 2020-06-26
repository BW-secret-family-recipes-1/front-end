import React from "react";
import { NavLink, withRouter } from "react-router-dom";

const Navigation = ({ history }) => {
    const signOut = () => {
        localStorage.removeItem('token');
        history.push('/login');
    };

    return (
        <div className="App">
            <nav className="nav">
        <div className="title-bar">
          <h1>Secret Family Recipes</h1>
        </div>
        <div className="nav-links">
          <a href="https://modest-lumiere-17a08c.netlify.app/" target="_blank">Home</a>
          <a href="https://modest-lumiere-17a08c.netlify.app/about" target="_blank">About</a>
          <NavLink to="/">Dashboard</NavLink>
          <NavLink to="/add-recipe">Add New Recipe</NavLink>
          <button onClick={signOut}>Sign Out</button>
        </div>
      </nav>
        </div>
    )
}

export default withRouter(Navigation);