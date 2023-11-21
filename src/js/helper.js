import { TIMEOUT_SEC } from './config.js';

/**The goal of this module is to contain a helper functions that we reuse
 * multiple times in our project */

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export const getJson = async function (url) {
  try {
    const response = await Promise.race([fetch(url), timeout(TIMEOUT_SEC)]);
    if (!response.ok) throw new Error(`${data.message} (${res.status})`);
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};
