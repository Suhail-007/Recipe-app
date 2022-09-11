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
  bookmarks: [],
}

export const loadRecipe = async function(id) {
  try {

    //getRecipe
    const data = await getJSON(`${API_URL}${id}`)

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

    if (state.bookmarks.some(bookmark => bookmark.id === id)) state.recipe.bookmarked = true;
    else state.recipe.bookmarked = false;

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

    // reset the page 
    state.search.page = 1;
  } catch (err) {
    throw err
  }
}

export const getSearchPageResults = function(page = 1) {
  state.search.page = page;
  const start = (page - 1) * state.search.resultsPerPage; // 0
  const end = page * state.search.resultsPerPage; // 9
  return state.search.results.slice(start, end);
}

//Update Servings
export const updateServings = function(newServings) {
  state.recipe.ingredients.forEach(ing => {
    ing.quantity = (ing.quantity * newServings) / state.recipe.servings;
  })

  return state.recipe.servings = newServings;
}

const persistBookmark = function () {
  return localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
}

export const addBookmark = function(recipe) {
  // Add bookmark
  state.bookmarks.push(recipe);

  // Mark current recipe as bookmarked
  if (recipe.id === state.recipe.id) state.recipe.bookmarked = true;

  persistBookmark()
};

export const deleteBookmark = function(id) {
  // Delete bookmark
  const index = state.bookmarks.findIndex(el => el.id === id);
  state.bookmarks.splice(index, 1);
  
  
  // Mark current recipe as NOT bookmarked
  if (id === state.recipe.id) state.recipe.bookmarked = false;
  persistBookmark()
};

function init() {
  const data = localStorage.getItem('bookmarks');
  if(data) state.bookmarks = JSON.parse(data);
}

init()
