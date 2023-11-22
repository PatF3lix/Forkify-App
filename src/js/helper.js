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

export const AJAX = async function (url, uploadData = undefined) {
  try {
    const fetchPro = uploadData
      ? fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(uploadData),
        })
      : fetch(url);
    const response = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);
    if (!response.ok) throw new Error();
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};
