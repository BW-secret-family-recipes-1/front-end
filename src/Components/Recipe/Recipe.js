import React from 'react';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { addRecipe } from "../../utils/actions";
import ShowArrayItem from "../../utils/ShowArrayitem";

class Recipe extends React.Component {
    state = {
        title: '',
        source: '',
        ingredients: [],
        instructions: [],
        categorys: [],
        category: '',
        commonCategorys: [
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

      addIntructions = e => {
        e.preventDefault();
        this.setState(state => {
          const instructions = [...state.instructions, state.instructionValue];
          return {
            instructions,
            instructionValue: ""
          };
        });
      };

      addCategoryByButton = (e, category) => {
        e.preventDefault();
        this.setState(state => {
          const categorys = [...state.categorys, category.toString()];
          const commonCategorys = state.commonCategorys.filter(el => el !== category);
          return {
            categorys,
            commonCategorys
          };
        });
      };

      addCustomCategory = (e) => {
        e.preventDefault();
        const newCategory = [...this.state.categorys]
        newCategory.push(this.state.category)
        this.setState({
          categorys: newCategory,
          category: ""
        })
      }

      deleteIngredient = (e, index) => {
        e.preventDefault();
        const newIngredients = [...this.state.ingredients];
        newIngredients.splice(index, 1);
        this.setState({
          ingredients: newIngredients
        });
      };
      deleteInstructions = (e, index) => {
        e.preventDefault();
        const newInstructions = [...this.state.instructions];
        newInstructions.splice(index, 1);
        this.setState({
          instructions: newInstructions
        });
      };
      deleteCategory = (e, index) => {
        e.preventDefault();
        const newCategory = [...this.state.category];
        newCategory.splice(index, 1);
        this.setState({
          category: newCategory
        });
      };

      submitRecipe = e => {
        e.preventDefault();
        const newRecipe = {
          title: this.state.title,
          source: this.state.source,
          ingredients: this.state.ingredients,
          instructions: this.state.instructions,
          category: this.state.category
        };
        console.log('submit recipe history', this.props.history);
        this.props.addRecipe(newRecipe, this.props.history);
      };
    
render(){
    return (
        <div className="recipe-form">
          <h2>Create New Recipe</h2>
          <form onSubmit={this.submitRecipe}>
            <input
              placeholder="Title"
              type="text"
              required
              name="title"
              onChange={this.handleChanges}
              value={this.state.title}
            />
            <input
              placeholder="Source"
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
              {this.state.ingredients.map((ingredient, index) => (
                <div className="ingredient">
                  <ShowArrayItem
                    listNum={index + 1}
                    item={ingredient}
                    key={index}
                  />
                  <button onClick={e => this.deleteIngredient(e, index)}>
                  Delete Ingredient
                </button>
                </div>
              ))}
            </div>
            <div className="directions-wrapper">
              <h3>Instructions</h3>
              <input
                type="text"
                name="instructionValue"
                onChange={this.handleChanges}
                value={this.state.instructionValue}
                placeholder="Instructions"
              />
              <button onClick={this.addInstructions}>Plus</button>
              {this.state.instructions.map((instruction, index) => (
                <div className="direction">
                  <ShowArrayItem
                    listNum={index + 1}
                    item={instruction}
                    key={index}
                  />
                  <button onClick={e => this.deleteInstructions(e, index)}>
                  Delete Instruction
                </button>
                </div>
              ))}
            </div>
            <div className="categorys-wrapper">
              <h3>Category</h3>
              <div className="categorys">
              {this.state.commonCategorys.map((category, index) => {
                return (
                  <button
                    key={index}
                    onClick={e => this.addCategoryByButton(e, category)}
                  >
                    {category}
                  </button>
                );
              })}
                 <input
                  type="text"
                  name="category"
                  onChange={this.handleChanges}
                  value={this.state.category}
                />
                <button onClick={this.addCustomCategory}>Add Custom Category</button>
              {this.state.categorys.map((category, index) => (
                <div className="tag">
                  <p>{category}</p>
                  <button onClick={e => this.deleteCategory(e, index)}>
                    Delete Category
                  </button>
                  </div>
                ))}
              </div>
            </div>
            <button type="submit">Add Recipe</button>
          </form>
        </div>
      );
    }
  }
  
  const mapStateToProps = state => ({
    addingRecipe: state.addingRecipe
  });
  
  export default withRouter(
    connect(
      mapStateToProps,
      { addRecipe }
    )(Recipe)
  );