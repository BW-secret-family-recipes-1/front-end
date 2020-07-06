import React from "react";
import RecipeForm from "../Forms/RecipeForm";
import Navigation from "../Navigation";
import Footer from "../Footer";

const AddRecipe =() => {
    return (
        <div className="App">
            <>
        <Navigation/>
        <RecipeForm/>
        <Footer />
        </>
        </div>
    )
}

export default AddRecipe;