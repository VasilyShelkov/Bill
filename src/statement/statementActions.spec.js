import expect from 'expect';
import * as actions from './statementActions';

describe('#StatementActions', () => {
  const statementId = 0;

  it('should create an action to request a new statement', () => {
    const expectedAction = {
      type: actions.REQUEST_STATEMENT,
      id: statementId,
    };

    expect(
      actions.requestStatement(statementId)
    ).toEqual(expectedAction);
  });

  it('should create an action to receive a new statement', () => {
    const exampleRecievedData = { exampleData: true, };
    const expectedAction = {
      type: actions.RECEIVE_STATEMENT,
      id: statementId,
      data: exampleRecievedData
    };
    // console.log('chai', should.deep);
    expect(
      actions.receiveStatement(statementId, exampleRecievedData)
    ).toEqual(expectedAction);
  });
});
