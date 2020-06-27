import React from 'react';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { addRecipe } from "../../utils/actions";

class Recipe extends React.Component {
    state = {
        title: '',
        source: '',
        category: '',
        step_number: '',
        instructions: '',
        name: ''
    };
    handleChanges = e => {
        e.persist();
        this.setState({
          ...this.state,
          [e.target.name]: e.target.value
        });
      };
    
      submitRecipe = e => {
        e.preventDefault();
        const newRecipe = {
          title: this.state.title,
          source: this.state.source,
          category: this.state.category
        };
        console.log('submit recipe history', this.props.history);
        this.props.addRecipe(newRecipe, this.props.history);
        const newIngredients = {
          name: this.state.name
        };
        console.log('submit ingredients', this.props.history);
        this.props.addIngredients(newIngredients, this.props.history);
        const newInstructions = {
          step_number: this.state.step_number,
          instructions: this.state.instructions
        };
        console.log('submit instructions', this.props.history);
        this.props.addInstructions(newInstructions, this.props.history);
      };
    
render(){
    return (
        <div className="recipe-form">
          <h2>Create New Recipe</h2>
          <form onSubmit={this.submitRecipe}>
{/* Add Title */}
            <input
              placeholder="Title"
              type="text"
              required
              name="title"
              onChange={this.handleChanges}
              value={this.state.title}
            />
{/* Add Source */}
            <input
              placeholder="Source"
              type="text"
              name="source"
              onChange={this.handleChanges}
              value={this.state.source}
            />
{/* Add Ingredients */}
              <h3>Ingredients</h3>
              <input
                placeholder="Ingredient"
                type="text"
                name="name"
                onChange={this.handleChanges}
                value={this.state.name}
              />            
{/* Add Instructions */}
            <div className="directions-wrapper">
              <h3>Instructions</h3>
    {/* Add Step Number */}
              <h3>Step Number</h3>
              <input
                type="text"
                name="step_numbers"
                onChange={this.handleChanges}
                value={this.state.step_numbers}
                placeholder="Instruction Number"
              />
      {/* Add Instructions */}
              <h3>Instructions</h3>
                <input
                type="text"
                name="instructions"
                onChange={this.handleChanges}
                value={this.state.instructions}
                placeholder="Instructions"
              />
            </div>
{/* Add Category */}
              <h3>Category</h3>
              <input
                type="text"
                name="category"
                onChange={this.handleChanges}
                value={this.state.category}
                placeholder="Category"
              />
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