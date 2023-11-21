import { API_URL } from './config.js';
import { API_KEY } from './config.js';
import { getJson } from './helper.js';

export const state = {
  recipe: {},
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

export const loadRecipe = async function (id) {
  const data = await getJson(`${API_URL}/${id}?key=${API_KEY}`);
  createStateRecipe(data);
};
