import React from "react";
import { NavLink, withRouter } from "react-router-dom";

const Navigation = ({ history }) => {
    
    return (
        <div className="Footer">
            <p>Created by Build Week Lambda Students</p>
            <p>June 2020</p>
        </div>
    )
}

export default withRouter(Navigation);