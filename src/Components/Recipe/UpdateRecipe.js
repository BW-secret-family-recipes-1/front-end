import React from "react";
import { connect } from "react-redux";
import { getRecipe, updateRecipe } from "../../utils/actions";
import { withRouter } from "react-router-dom";
import ShowArrayItem from "../Forms/ShowArrayItem";
import { axiosWithAuth } from "../../utils/axiosWithAuth";

class RecipeUpdateForm extends React.Component {
  state = {
    title: "",
    source: "",
    ingredients: [],
    directions: [],
    tags: [],
    ingredientValue: "",
    directionValue: "",
    tag: "",
    commonTags: [
      "Breakfast",
      "Lunch",
      "Dinner",
      "Dessert",
      "Side",
      "Main",
      "Appetizer",
      "Vegetable",
      "Chicken",
      "Pork",
      "Beef",
      "Quick"
    ]
  };

  componentDidMount() {
    if (!this.props.recipe) {
      axiosWithAuth()
        .get(`/recipes/${this.props.match.params.id}`)
        .then(res => {
          this.setState({
            title: res.data.recipe.title,
            source: res.data.recipe.source,
            ingredients: res.data.recipe.ingredients,
            directions: res.data.recipe.instructions,
            tags: res.data.recipe.tags,
            ingredientValue: "",
            directionValue: "",
            tag: ""
          });
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      this.setState({
        title: this.props.recipe.title,
        source: this.props.recipe.source,
        ingredients: this.props.recipe.ingredients,
        directions: this.props.recipe.instructions,
        tags: this.props.recipe.tags,
        ingredientValue: "",
        directionValue: "",
        tag: ""
      });
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.recipe !== this.props.recipe && this.props.success) {
      this.setState({
        title: this.props.recipe.title,
        source: this.props.recipe.source,
        ingredients: this.props.recipe.ingredients,
        directions: this.props.recipe.instructions,
        tags: this.props.recipe.tags,
        ingredientValue: "",
        directionValue: "",
        tag: ""
      });
    }
  }

  handleChanges = e => {
    e.persist();
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value
    });
  };

  addIngredient = e => {
    e.preventDefault();
    this.setState(state => {
      const ingredients = [...state.ingredients, state.ingredientValue];
      return {
        ingredients,
        ingredientValue: ""
      };
    });
  };

  addDirection = e => {
    e.preventDefault();
    this.setState(state => {
      const directions = [...state.directions, state.directionValue];
      return {
        directions,
        directionValue: ""
      };
    });
  };

  addTagByButton = (e, tag) => {
    e.preventDefault();
    this.setState(state => {
      const tags = [...state.tags, tag.toString()];
      const commonTags = state.commonTags.filter(el => el !== tag);
      return {
        tags,
        commonTags
      };
    });
  };
  addCustomTag = e => {
    e.preventDefault();
    const newTags = [...this.state.tags];
    newTags.push(this.state.tag);
    this.setState({
      tags: newTags,
      tag: ""
    });
  };

  deleteIngredient = (e, index) => {
    e.preventDefault();
    const newIngredients = [...this.state.ingredients];
    newIngredients.splice(index, 1);
    this.setState({
      ingredients: newIngredients
    });
  };
  deleteDirection = (e, index) => {
    e.preventDefault();
    const newDirections = [...this.state.directions];
    newDirections.splice(index, 1);
    this.setState({
      directions: newDirections
    });
  };
  deleteTag = (e, index) => {
    e.preventDefault();
    const newTags = [...this.state.tags];
    newTags.splice(index, 1);
    this.setState({
      tags: newTags
    });
  };


  updateRecipe = e => {
    e.preventDefault();
    const fullNoteString = this.state.fullNote.join("||");
    const updatedRecipe = {
      title: this.state.title,
      source: this.state.source,
      ingredients: this.state.ingredients,
      instructions: this.state.directions,
      tags: this.state.tags
    };
    this.props.updateRecipe(this.props.match.params.id, updatedRecipe, this.props.history);
  };

  render() {
    return (
      <div className="recipe-form">
        <h2>Edit Recipe</h2>
        <form onSubmit={this.updateRecipe}>
          <input
            placeholder={this.state.title}
            type="text"
            required
            name="title"
            onChange={this.handleChanges}
            value={this.state.title}
          />
          <input
            placeholder={this.state.source}
            type="text"
            name="source"
            onChange={this.handleChanges}
            value={this.state.source}
          />
          <div className="ingredients-wrapper">
            <h3>Ingredients</h3>

            <input
              placeholder="Ingredient"
              type="text"
              name="ingredientValue"
              onChange={this.handleChanges}
              value={this.state.ingredientValue}
            />
            <button onClick={this.addIngredient}>Add Ingredient</button>

            <div className="ingredients-list">
            {this.state.ingredients.map((ingredient, index) => (
              <div className="ingredient">
                <ShowArrayItem
                  listNum={index + 1}
                  item={ingredient}
                  key={index}
                />
                  <button
                    onClick={e => this.deleteIngredient(e, index)}
                  />
              </div>
            ))}
            </div>
          </div>
          <div className="directions-wrapper">
            <h3>Directions</h3>
            <input
              type="text"
              name="directionValue"
              onChange={this.handleChanges}
              value={this.state.directionValue}
              placeholder="Direction"
            />
            <button onClick={this.addDirection}>Plus</button>
            {this.state.directions.map((direction, index) => (
              <div className="direction">
                <ShowArrayItem
                  listNum={index + 1}
                  item={direction}
                  key={index}
                />
                  <button 
                  onClick={e => this.deleteDirection(e, index)}
                  />
              </div>
            ))}
          </div>
          <div className="tags-wrapper">
            <h3>Tags</h3>
            <div className="tags">
              {this.state.commonTags.map((tag, index) => {
                return (
                  <button
                    key={index}
                    onClick={e => this.addTagByButton(e, tag)}
                  >
                    {tag}
                  </button>
                );
              })}
              <input
                type="text"
                name="tag"
                onChange={this.handleChanges}
                value={this.state.tag}
              />
              <button onClick={this.addCustomTag}>Add Custom Tag</button>
              {this.state.tags.map((tag, index) => (
                <div className="tag">
                  <p>{tag}</p>
                  <button
                    onClick={e => this.deleteTag(e, index)}
                  />
                </div>
              ))}
            </div>
          </div>
          <button type="submit">Submit Recipe</button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  recipe: state.recipe,
  fetchingRecipe: state.fetchingRecipe,
  updatingRecipe: state.updatingRecipe,
  success: state.success
});

export default withRouter(
  connect(
    mapStateToProps,
    { getRecipe, updateRecipe }
  )(RecipeUpdateForm)
);
