import React from "react";
import { connect } from "react-redux";
import { getTitles } from "../../utils/actions";

class TagSearch extends React.Component {
  state = {
    currentTag: "all"
  };

  searchRecipes = (e, selectedTag) => {
    e.preventDefault();
    if (selectedTag === "all") {
      this.props.currentRecipes = this.props.titles;
    } else {
      this.props.currentRecipes = [];
      this.props.titles.forEach(recipe => {
        if (recipe.tags.includes(selectedTag)) {
          this.props.currentRecipes.push(recipe);
        }
      });
    }
  };

  render() {
    if (!this.props.titles) {
      return <h2>Loading...</h2>;
    } else {
      return (
        <div className="search-wrapper">
          {this.props.uniqueTags.map((tag, index) => (
            <button onClick={e => this.searchRecipes(e, tag)} key={`t${index}`}>
              {tag}
            </button>
          ))}
        </div>
      );
    }
  }
}

const mapStateToProps = state => ({
  titles: state.titles.recipes,
  fetchingTitles: state.fetchingTitles,
  uniqueTags: state.uniqueTags,
  currentRecipes: state.currentRecipes
});

export default connect(
  mapStateToProps,
  { getTitles }
)(TagSearch);
