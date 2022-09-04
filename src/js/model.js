import { API_URL } from './config.js'
import { getJSON } from './helper.js'

export const state = {
  recipe: {},
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
