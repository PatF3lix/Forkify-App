import * as model from './model.js';
import recipeView from './views/recipeView.js';

import 'core-js/stable';
import 'regenerator-runtime';

const recipeContainer = document.querySelector('.recipe');

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// https://forkify-api.herokuapp.com/v2

//API key : 5be600ac-b2a4-4a3c-a8de-ed748864cb2d
//Get all recipes/Create recipe: https://forkify-api.herokuapp.com/api/v2/recipes?search=pizza&key=<insert your key>
//https://forkify-api.herokuapp.com/api/v2/recipes

//Get recipe/Delete recipe: https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bc886?key=<insert your key>
//https://forkify-api.herokuapp.com/api/v2/recipes/:id
///////////////////////////////////////

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;
    recipeView.renderSpinner();

    //loading recipe
    await model.loadRecipe(id);

    //Rendinering recipe
    recipeView.render(model.state.recipe);
  } catch (error) {
    alert(error);
  }
};

['hashchange', 'load'].forEach(ev =>
  window.addEventListener(ev, controlRecipes)
);
