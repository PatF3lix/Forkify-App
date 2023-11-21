import { async } from 'regenerator-runtime';

/**The goal of this module is to contain a helper functions that we reuse multiple times in our project */
export const getJson = async function (url) {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`${data.message} (${res.status})`);
    const data = await response.json();
    return data;
  } catch (error) {
    alert(error);
  }
};
