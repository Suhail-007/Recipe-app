import * as models from './model.js'
import recipeView from './recipeView.js'
import searchView from './views/SearchView.js'
import resultView from './views/resultView.js'
import pagination from './views/paginationView.js'

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const controlRecipe = async function() {
  try {
    //render loading spinner
    recipeView.renderSpinner();

    const id = window.location.hash;
    if (!id) return;

    //load recipe
    await models.loadRecipe(id);

    //render recipe
    recipeView.render(models.state.recipe);
  } catch (e) {
    recipeView.renderErrorMessage();
  }
}

const controlSearchRecipes = async function() {
  try {
    //1.get query
    const query = searchView.getQuery();
    if (!query) return

    //load Spinner
    resultView.renderSpinner();

    //2. load recipes
    await models.loadSearchRecipe(query);

    //render search results
    resultView.render(models.getSearchPageResults());

    //render pagination 
    pagination.render(models.state.search)
  } catch (err) {
    console.log(err);
  }
}

const controlPagination= function(goToPage) {
  //render new results
  resultView.render(models.getSearchPageResults(goToPage));

  //render new pagination
  pagination.render(models.state.search)
}


const init = function() {
  recipeView.addHandlerRender(controlRecipe);
  searchView.addHandlerSearch(controlSearchRecipes);
  pagination.addHandlerClick(controlPagination);
}

init();
