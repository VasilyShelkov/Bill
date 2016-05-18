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

/**
 * Returns a new string which starts with a capital letter and is spaced based on camel casing
 * @param String (eg. skyStore)
 * @returns String
 */
export const capitalizeAndSpaceString = (camelCaseString) =>
  camelCaseString.charAt(0).toUpperCase() + camelCaseString.replace(/([A-Z])/g, ' $1').substr(1);

/**
 * Returns the object grouped by its item details
 * @param [{item:{}, cost:Number}]
 * @returns [{item:{}, cost:Number}]
 */
export const groupCostsOfSameItems = (splitCostFromItemDetailsList) =>
  splitCostFromItemDetailsList.reduce((breakdownCategories, currentItem) => {
    const indexOfCategory = breakdownCategories.findIndex(categoryItem =>
      JSON.stringify(categoryItem.item) === JSON.stringify(currentItem.item)
    );

    if (indexOfCategory !== -1) {
      return [
        ...breakdownCategories.slice(0, indexOfCategory),
        {
          ...breakdownCategories[indexOfCategory],
          cost: breakdownCategories[indexOfCategory].cost + currentItem.cost,
        },
        ...breakdownCategories.slice(indexOfCategory + 1),
      ];
    }

    return [
      ...breakdownCategories,
      currentItem
    ];
  }, []);

/**
 * Returns the an object which splits cost from its other details
 * @param [{cost:Number, otherdetails}]
 * @returns [{item:{}, cost:Number}]
 */
export const splitCostFromItem = (itemWithCostAndOtherDetails) =>
  itemWithCostAndOtherDetails.map(chargeItem => ({
    item: Object.keys(chargeItem).reduce((itemWithoutCostKey, currentKey) => {
      if (currentKey !== 'cost') {
        return {
          ...itemWithoutCostKey,
          [currentKey]: chargeItem[currentKey]
        };
      }

      return itemWithoutCostKey;
    }, {}),
    cost: chargeItem.cost
  }));
