import fetch from 'isomorphic-fetch';

const billUrl = 'https://still-scrubland-9880.herokuapp.com';

/**
 * Starts a new Promise chain, resolving immediately.
 * @param callback Must return a Promise.
 * @returns {Promise}
 */
export const newPromiseChain = () => (
  new Promise((resolve) => {
    resolve();
  })
);

/**
 * Creates a JSON GET fetch promise with a given url and body
 * @param url Where to POST, e.g. '/search'
 */
export const fetchGET = (url) => (
  fetch(billUrl + url, makeGetHeader())
);

/**
 * Generates the boilerplate headers for a JSON GET request
 * @returns {{method: string, headers: {Accept: string, Content-Type: string}}}
 */
export const makeGetHeader = () => ({
  method: 'GET',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});
