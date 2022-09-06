import { API_URL } from './config.js'
import { getJSON } from './helper.js'

export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
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
  } catch (e) {
    throw err
  }
}
