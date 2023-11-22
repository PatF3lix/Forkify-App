import { API_URL } from './config.js';
import { API_KEY } from './config.js';
import { RES_PER_PAGE } from './config.js';
import { getJson } from './helper.js';

export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
    resultsPerPage: RES_PER_PAGE,
    page: 1,
  },
};

const createStateRecipe = function (data) {
  const { recipe: loadedRecipe } = data.data;
  state.recipe = {
    id: loadedRecipe.id,
    title: loadedRecipe.title,
    publisher: loadedRecipe.publisher,
    sourceUrl: loadedRecipe.source_url,
    image: loadedRecipe.image_url,
    servings: loadedRecipe.servings,
    cookingTime: loadedRecipe.cooking_time,
    ingredients: loadedRecipe.ingredients,
  };
};

const createAllStateRecipes = function (data) {
  const { recipes: allLoadedRecipes } = data.data;
  state.search.results = allLoadedRecipes.map(recipe => {
    return {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      image: recipe.image_url,
    };
  });
};

export const loadRecipe = async function (id) {
  try {
    const data = await getJson(`${API_URL}/${id}?key=${API_KEY}`);
    createStateRecipe(data);
  } catch (error) {
    throw error;
  }
};

export const loadSearchResults = async function (query) {
  try {
    state.search.query = query;
    state.search.page = 1;
    const data = await getJson(`${API_URL}?search=${query}`);
    createAllStateRecipes(data);
  } catch (error) {
    throw error;
  }
};

export const getSearchResultsPage = function (page = state.search.page) {
  const { resultsPerPage } = state.search;
  state.search.page = page;
  return state.search.results.slice(
    resultsPerPage * page - resultsPerPage,
    resultsPerPage * page
  );
};

export const updateServings = function (newServings) {
  state.recipe.ingredients.forEach(ing => {
    ing.quantity = (ing.quantity * newServings) / state.recipe.servings;
  });

  state.recipe.servings = newServings;
};
