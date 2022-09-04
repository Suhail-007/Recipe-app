import * as models from './model.js'
import recipeview from './recipeView.js'

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
    console.log(`Something went wrong ${e.message}`);
  }
}

const init = function () {
  recipeview.addHandlerRender(controlRecipe);
}

init();