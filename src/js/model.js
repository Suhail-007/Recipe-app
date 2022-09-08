import { API_URL, RES_PER_PAGE } from './config.js'
import { getJSON } from './helper.js'

export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
    resultsPerPage: RES_PER_PAGE,
    page: 1
  },
}

export const loadRecipe = async function(id) {
  try {

    //getRecipe
    const data = await getJSON(`${API_URL}${id.slice(1)}`)

    const { recipe } = data.data;

    state.recipe = {
      cookingTime: recipe.cooking_time,
      id: recipe.id,
      imgUrl: recipe.image_url,
      ingredients: recipe.ingredients,
      publisher: recipe.publisher,
      servings: recipe.servings,
      sourceUrl: recipe.source_url,
      title: recipe.title,
    }
  } catch (err) {
    throw err
  }
}

export const loadSearchRecipe = async function(query) {
  try {
    state.search.query = query;
    const data = await getJSON(`${API_URL}?search=${query}`);
    state.search.results = data.data.recipes.map(recipe => {
      return {
        id: recipe.id,
        imgUrl: recipe.image_url,
        publisher: recipe.publisher,
        title: recipe.title,
      }
    })
  } catch (err) {
    throw err
  }
}

export const getSearchPageResults = function(page = 1) {
  state.search.page = page;
  const start = (state.search.page - 1) * 10;
  const end = state.search.page * 10;
  return state.search.results.slice(start, end);
}

//Update Servings
export const updateServings = function (newServings) {
  state.recipe.ingredients.forEach(ing => {
    ing.quantity = (ing.quantity * newServings) / state.recipe.servings;
  })
  
  state.recipe.servings = newServings;
}
