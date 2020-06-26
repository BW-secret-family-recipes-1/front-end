import React from 'react';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { addRecipe } from "../../utils/actions";
import ShowArrayItem from "../../utils/ShowArrayitem";

class Recipe extends React.Component {
    state = {
        title: '',
        source: '',
        category: '',
        step_number: [],
        instructions: '',
        name: [],
        nameValue: '',
        step_numbersValue: ''
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
          const name = [...state.name, state.nameValue];
          return {
            name,
            nameValue: ""
          };
        });
      };

      addInstructions = e => {
        e.preventDefault();
        this.setState(state => {
          const instructions = [...state.instructions, state.instructionValue];
          return {
            instructions,
            instructionValue: ""

          };
        });
      };
      addStep = e => {
        e.preventDefault();
        this.setState(state => {
          const step_number = [...state.step_number, state.step_numbersValue];
          return {
            step_number,
            step_numbersValue: ''

          };
        });
      };

      addCategory = (e) => {
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
        const newName = [...this.state.name];
        newName.splice(index, 1);
        this.setState({
          name: newName
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
      deleteStep = (e, index) => {
        e.preventDefault();
        const newStep_number = [...this.state.step_number];
        newStep_number.splice(index, 1);
        this.setState({
          step_number: newStep_number
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
          name: this.state.name,
          step_number: this.state.step_number,
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
            <div className="ingredients-wrapper">
              <h3>Ingredients</h3>
              <input
                placeholder="Ingredient"
                type="text"
                name="nameValue"
                onChange={this.handleChanges}
                value={this.state.nameValue}
              />
              <button onClick={this.addIngredient}>Add Ingredient</button>
              {this.state.name.map((names, index) => (
                <div className="ingredient">
                  <ShowArrayItem
                    listNum={index + 1}
                    item={names}
                    key={index}
                  />
                  <button onClick={e => this.deleteIngredient(e, index)}>
                  Delete Ingredient
                </button>
                </div>
              ))}
            </div>
{/* Add Instructions */}
            <div className="directions-wrapper">
              <h3>Instructions</h3>
    {/* Add Step Number */}
              <h3>Step Number</h3>
              <input
                type="text"
                name="step_numbersValue"
                onChange={this.handleChanges}
                value={this.state.step_numbersValue}
                placeholder="Instruction Number"
              />
              <button onClick={this.addStep_number}>Add</button>
              {this.state.step_number.map((step_numbers, index) => (
                <div className="direction">
                  <ShowArrayItem
                    listNum={index + 1}
                    item={step_numbers}
                    key={index}
                  />
                  <button onClick={e => this.deleteInstructions(e, index)}>
                  Delete Step
                </button>
                </div>
                ))}
      {/* Add Instructions */}
                <input
                type="text"
                name="instructionValue"
                onChange={this.handleChanges}
                value={this.state.instructionValue}
                placeholder="Instructions"
              />
              <button onClick={this.addInstructions}>Add</button>
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
{/* Add Category */}
            <div className="categorys-wrapper">
              <h3>Category</h3>
              <div className="categorys">
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