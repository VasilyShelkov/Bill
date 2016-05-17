import { newPromiseChain, fetchGET } from '../utilities.js';

let lastStatementId = 0;

export const fetchStatement = () => {
  const newStatementId = lastStatementId++;
  return (dispatch) =>
    newPromiseChain()
      .then(() => dispatch(requestStatement(newStatementId)))
      .then(() => fetchGET('/bill.json'))
      .then(response => response.json())
      .then(statement => dispatch(receiveStatement(newStatementId, statement)));
};

export const REQUEST_STATEMENT = 'REQUEST_STATEMENT';
export const requestStatement = (id) => ({
  type: REQUEST_STATEMENT,
  id,
});

export const RECEIVE_STATEMENT = 'RECEIVE_STATEMENT';
export const receiveStatement = (id, data) => ({
  type: RECEIVE_STATEMENT,
  id,
  data,
});
