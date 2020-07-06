import React from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";

import ShowArrayItem from "../Forms/ShowArrayItem";
import { getRecipe, deleteRecipe } from "../../utils/actions";

class Recipe extends React.Component {
  componentDidMount() {
    this.props.getRecipe(this.props.recipeID);
  }
  componentDidUpdate(prevProps) {

    if (prevProps.recipeID !== this.props.recipeID) {
      this.props.getRecipe(this.props.recipeID);
    }
  }

  deleteRecipe = (e, ID) => {
    e.preventDefault();
    this.props.deleteRecipe(ID, this.props.history);
  };

  render() {
    if (this.props.fetchingRecipe || !this.props.recipe) {
      return <h2>Loading Recipe for Single Recipe Page...</h2>;
    }
    return (
      <div className="recipe-view-wrapper">
        <h2>{this.props.recipe.title}</h2>
        <p>Source: {this.props.recipe.source}</p>

        <h3>Tags</h3>
        <div className="tags">
          {this.props.recipe.tags.map((tag, index) => (
            <p key={`t${index}`} className="tag">
              {tag}
            </p>
          ))}
        </div>
        <h3>Ingredients</h3>
        {this.props.recipe.ingredients.map((ingredient, index) => (
          <ShowArrayItem
            listNum={index + 1}
            item={ingredient}
            key={`i${index}`}
          />
        ))}
        <h3>Directions</h3>
        {this.props.recipe.instructions.map((instruction, index) => (
          <ShowArrayItem
            listNum={index + 1}
            item={instruction}
            key={`d${index}`}
          />
        ))}
        <h3>Note</h3>
        <p>{this.props.recipe.notes}</p>
        <Link
          to={{
            pathname: `/recipes/edit/${this.props.recipeID}`,
            recipeID: this.props.recipeID
          }}
          key={this.props.recipeID}
        >
        </Link>

        <button
          onClick={e => this.deleteRecipe(e, this.props.recipeID)}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  recipe: state.recipe,
  fetchingRecipe: state.fetchingRecipe
});

export default withRouter(
  connect(
    mapStateToProps,
    { getRecipe, deleteRecipe }
  )(Recipe)
);
