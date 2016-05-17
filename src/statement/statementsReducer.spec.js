import expect from 'expect';
import deepFreeze from 'deep-freeze';
import d3 from 'd3';
import statementsReducer from './statementsReducer';
import * as actions from './statementActions';

describe('#statementsReducer', () => {
  it('should request a statement with id', () => {
    const stateBefore = { statements: [], selectedStatementId: false };
    const action = actions.requestStatement(0);

    const stateAfter = {
      statements: [{ id: 0, fetching: true, }],
      selectedStatementId: 0,
    };

    deepFreeze(stateBefore);
    deepFreeze(action);

    expect(
      statementsReducer(stateBefore, action)
    ).toEqual(stateAfter);
  });

  it('should recieve and transform statement with id', () => {
    const categoryColors = d3.scale.category20();

    const stateBefore = {
      statements: [{ id: 0, fetching: true, }],
      selectedStatementId: 0,
    };

    // simplified expected return JSON
    const BILL_TOTAL_EXAMPLE = 1000;
    const BREAKDOWN_TOTAL_EXAMPLE = BILL_TOTAL_EXAMPLE / 2;
    const exampleBillJSON = {
      statement: {
        exampleField: 'bla'
      },
      total: BILL_TOTAL_EXAMPLE,
      package: {
        subscriptions: [1, 2, 3],
        total: BREAKDOWN_TOTAL_EXAMPLE,
      },
      skyStore: {
        rentals: [1, 2],
        buyAndKeep: [1, 2, 3],
        total: BREAKDOWN_TOTAL_EXAMPLE,
      }
    };

    const action = actions.receiveStatement(0, exampleBillJSON);

    const stateAfter = {
      statements: [{
        id: 0,
        fetching: false,
        overview: {
          total: BILL_TOTAL_EXAMPLE,
          ...exampleBillJSON.statement
        },
        charges: [{
          category: 'package',
          color: categoryColors(0),
          breakdown: {
            ...exampleBillJSON.package
          }
        }, {
          category: 'skyStore',
          color: categoryColors(1),
          breakdown: {
            ...exampleBillJSON.skyStore
          }
        }]
      }],
      selectedStatementId: 0,
    };

    // making sure that the state tree is not mutated as this has negative effects
    // on Redux
    deepFreeze(stateBefore);
    deepFreeze(action);

    expect(
      statementsReducer(stateBefore, action)
    ).toEqual(stateAfter);
  });
});
