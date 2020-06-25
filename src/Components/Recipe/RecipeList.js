import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getTitles } from "../../utils/actions";

class RecipeSideBar extends React.Component {
  componentDidMount() {
    this.props.getTitles();
  }
  render() {
    if (!this.props.currentRecipes || this.props.fetchingTitles) {
      return <p>Loading...</p>;
    } else {
      return (
        <div className="recipe-cards-wrapper">
        {console.log("this" ,this.props.currentRecipe)}
          {this.props.currentRecipes.map(title => {
            return (
              <div className="recipe-card">
                <Link to={`/recipes/view/${title.id}`} key={title.id}>
                  <h3>{title.title}</h3>
                  <p>Source: {title.source}</p>
                  <div className="recipe-card-tags">
                    {title.tags.map(tag => (
                      <p className="tag">{tag} </p>
                    ))}
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      );
    }
  }
}

const mapStateToProps = state => ({
  titles: state.titles.recipes,
  fetchingTitles: state.fetchingTitles,
  currentRecipes: state.currentRecipes
});

export default connect(
  mapStateToProps,
  { getTitles }
)(RecipeSideBar);

