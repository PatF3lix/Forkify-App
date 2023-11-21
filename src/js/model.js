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
  try {
    const response = await fetch(
      `https://forkify-api.herokuapp.com/api/v2/recipes/${id}?key=5be600ac-b2a4-4a3c-a8de-ed748864cb2d`
    );
    if (!response.ok) throw new Error(`${data.message} (${res.status})`);

    const data = await response.json();
    createStateRecipe(data);
  } catch (error) {
    alert(error);
  }
};
