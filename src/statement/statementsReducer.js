import d3 from 'd3';
import { REQUEST_STATEMENT, RECEIVE_STATEMENT } from './statementActions';

const statementsReducer = (state = { statements: [], selectedStatementId: false }, action) => {
  switch (action.type) {
  case REQUEST_STATEMENT:
    return {
      statements: [
        ...state,
        statementReducer(state[action.statementId], action),
      ],
      selectedStatementId: !state.selectedStatementId && state.selectedStatementId !== 0 ? action.id : state.selectedStatementId
    };
  case RECEIVE_STATEMENT:
    return {
      ...state,
      statements: state.statements.map(statement => statementReducer(statement, action)),
    };
  default:
    return state;
  }
};

const statementReducer = (state = {}, action) => {
  switch (action.type) {
  case REQUEST_STATEMENT:
    return {
      ...state,
      id: action.id,
      fetching: true,
    };
  case RECEIVE_STATEMENT: {
    const categoryColors = d3.scale.category10();

    if (state.id !== action.id) {
      return state;
    }
    return {
      ...state,
      fetching: false,
      overview: {
        total: action.data.total,
        ...action.data.statement
      },
      charges: Object.keys(action.data).reduce((allCharges, currentCharge, id) => {
        // ignore these keys that are overview information
        if (currentCharge === 'total' || currentCharge === 'statement') {
          return allCharges;
        }

        const charge = action.data[currentCharge];
        return [
          ...allCharges,
          {
            category: currentCharge,
            color: categoryColors(id),
            breakdown: {
              ...charge
            },
          }
        ];
      }, [])
    };
  }
  default:
    return state;
  }
};

export default statementsReducer;
