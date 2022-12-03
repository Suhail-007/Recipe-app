import { API_URL, RES_PER_PAGE, API_KEY } from './config.js'
import { getJSON, sendJSON } from './helper.js'

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

const createRecipeObj = function(data) {
  const { recipe } = data.data;
  return {
    cookingTime: recipe.cooking_time,
    id: recipe.id,
    imgUrl: recipe.image_url,
    ingredients: recipe.ingredients,
    publisher: recipe.publisher,
    servings: recipe.servings,
    sourceUrl: recipe.source_url,
    title: recipe.title,
    ...(recipe.key && { key: recipe.key }),
  }
}

//Load recipe from API 
export const loadRecipe = async function(id) {
  try {

    //getRecipe
    const data = await getJSON(`${API_URL}${id}`);

    state.recipe = await createRecipeObj(data);

    //if recipe exist in bookmarks array set bookmark property true else false
    if (state.bookmarks.some(bookmark => bookmark.id === id)) state.recipe.bookmarked = true;
    else state.recipe.bookmarked = false;

  } catch (err) {
    throw err
  }
}

//Searched Recipe
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

//pagination
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

//add bookmarks to localStorage  
const persistBookmark = function() {
  return localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));
}

export const addBookmark = function(recipe) {
  // Add bookmark
  state.bookmarks.push(recipe);

  // Mark current recipe as bookmarked
  if (recipe.id === state.recipe.id) state.recipe.bookmarked = true;

  persistBookmark()
};

//Delete a bookmark from local storage
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
  if (data) state.bookmarks = JSON.parse(data);
}

init()

export const uploadRecipe = async function(newRecipe) {
  try {
    const ingredients = Object.entries(newRecipe)
      .filter(entry => entry[0].startsWith('ingredient') && entry[1] !== '')
      .map(ing => {

        //removing if any white space
        const ingArr = ing[1].replaceAll(' ', '')
          .split(',');

        if (ingArr.length !== 3) throw new Error('Please enter correct format');

        const [quantity, unit, description] = ingArr;

        return { quantity: quantity ? +quantity : null, unit, description };
      });

    const recipe = {
      title: newRecipe.title,
      cooking_time: +newRecipe.cookingTime,
      image_url: newRecipe.image,
      publisher: newRecipe.publisher,
      servings: +newRecipe.servings,
      source_url: newRecipe.sourceUrl,
      title: newRecipe.title,
      ingredients,
    }
    const data = await sendJSON(`${API_URL}?key=${API_KEY}`, recipe);

    state.recipe = createRecipeObj(data);

    addBookmark(state.recipe);
  } catch (err) {
    throw err
  }
}
