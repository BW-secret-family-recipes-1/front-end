import React from "react";

const RecipeCard = props => {
  return (
    <div className="recipe-card">
      <h3>{props.recipe.title}</h3>
      <p>Source: {props.recipe.source}</p>
      <div className="recipe-card-tags">
        {props.recipe.tags.map(tag => (
          <p className="tag">{tag} </p>
        ))}
      </div>
    </div>
  );
};

export default RecipeCard;
