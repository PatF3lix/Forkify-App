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

const showRecipe = async function () {
  try {
    const response = await fetch(
      'https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bc886?key=5be600ac-b2a4-4a3c-a8de-ed748864cb2d'
    );

    const data = await response.json();

    if (!response.ok) throw new Error(`${data.message} (${res.status})`);
    let { recipe } = data.data;
    recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
    };
    console.log(recipe);
  } catch (error) {
    alert(error);
  }
};

showRecipe();
