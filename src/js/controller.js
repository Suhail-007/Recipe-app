import * as models from './model.js'
import recipeview from './recipeView.js'
import searchview from './views/searchViews.js'
import resultview from './views/resultsview.js'

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const controlRecipe = async function() {
  try {
    //render loading spinner
    recipeview.renderSpinner();

    const id = window.location.hash;
    if (!id) return;

    //load recipe
    await models.loadRecipe(id);

    //render recipe
    recipeview.render(models.state.recipe);
  } catch (e) {
    recipeview.renderErrorMessage();
  }
}

const controlSearchRecipes = async function() {
  try {
    //1.get query
    const query = searchview.getQuery();
    if (!query) return
    
   //load Spinner
   resultview.renderSpinner();
    
    //2. load recipes
    await models.loadSearchRecipe(query);
    console.log(models.state.search.results);
  } catch (err) {
    console.log(err);
  }
}

const init = function() {
  recipeview.addHandlerRender(controlRecipe);
  searchview.addHandlerSearch(controlSearchRecipes)
}

init();
