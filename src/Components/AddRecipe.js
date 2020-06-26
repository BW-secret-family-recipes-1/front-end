import React from "react";
import Recipe from "../Components/Recipe/Recipe";
import Navigation from "./Navigation";
import Footer from './Footer';

const AddRecipe =() => {
    return (
        <div className="App">
            <>
        <Navigation/>
        <Recipe/>
        <Footer/>
        </>
        </div>
    )
}

export default AddRecipe;