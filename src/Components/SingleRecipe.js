import React from "react";
import Recipe from "../Components/Recipe/Recipe";
import Navigation from "../Components/Navigation";
import Footer from "../Components/Footer";

const SingleRecipe = props => {
  return (
    <div className="full-recipe-wrapper">
      <Navigation />
      <Recipe recipeID={props.match.params.id} />
      <Footer />
    </div>
  );
};

export default SingleRecipe;
