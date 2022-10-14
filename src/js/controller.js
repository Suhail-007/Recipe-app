import * as models from './model.js'
import recipeView from './views/recipeView.js'
import searchView from './views/SearchView.js'
import resultView from './views/resultView.js'
import pagination from './views/paginationView.js'
import bookmarkView from './views/bookmarkView.js'
import addRecipeView from './views/addRecipeView.js'
import { MODEL_CLOSE_SEC } from './config.js'

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const controlRecipe = async function() {
  try {

    //render loading spinner
    recipeView.renderSpinner();

    const id = window.location.hash;
    if (!id) return;

    //active recipe
    resultView.update(models.getSearchPageResults());

    //update Boomarks
    bookmarkView.update(models.state.bookmarks);

    //load recipe 
    await models.loadRecipe(id.slice(1));

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

const controlPagination = function(goToPage) {
  //render new results
  resultView.render(models.getSearchPageResults(goToPage));

  //render new pagination
  pagination.render(models.state.search)
}

const controlServings = function(newServings) {
  models.updateServings(newServings);

  recipeView.update(models.state.recipe);
}

const controlAddBookmark = function() {
  // 1) Add/remove bookmark
  if (!models.state.recipe.bookmarked) models.addBookmark(models.state.recipe);
  else models.deleteBookmark(models.state.recipe.id)

  // 2) Update recipe view
  recipeView.update(models.state.recipe);

  //3 bookmarks
  bookmarkView.render(models.state.bookmarks);

};

const controlBookmarks = function() {
  bookmarkView.render(models.state.bookmarks);
}

//upload recipe
const controlUploadRecipe = async function(newRecipe) {
  try {
    //render spinner
    addRecipeView.renderSpinner();

    //Upload new recipe
    await models.uploadRecipe(newRecipe);

    //render recipe
    recipeView.render(models.state.recipe);

    //Render success msg
    addRecipeView.renderSuccessMessage();

    // Render bookmark view
    bookmarkView.render(models.state.bookmarks);
    
    //change url
    window.history.pushState(null, '', `${models.state.recipe.id}`);

    //toggle Window
    setTimeout(function() {
      addRecipeView.toggleWindow();
    }, MODEL_CLOSE_SEC * 1000);

  } catch (err) {
    console.error(err);
    addRecipeView.renderErrorMessage(err)
  }
}

const init = function() {
  bookmarkView.addHandlerRender(controlBookmarks)
  recipeView.addHandlerRender(controlRecipe);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark)
  searchView.addHandlerSearch(controlSearchRecipes);
  pagination.addHandlerClick(controlPagination);
  addRecipeView.addHandlerUploadRecipe(controlUploadRecipe);
}

init();
