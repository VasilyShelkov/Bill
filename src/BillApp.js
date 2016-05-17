import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchStatement } from './statement/statementActions';
import Overview from './statement/Overview';
import ChargeList from './statement/ChargeList';

class BillApp extends Component {
  componentDidMount() {
    this.props.fetchStatement();
  }

  render() {
    const bill = this.props.bill;
    // get the bill that is selected based on the id that's references the selected statement from redux
    const selectedStatement = bill.statements.reduce((selectedStatementById, currentStatement) => {
      if (currentStatement.id === bill.selectedStatementId) {
        return currentStatement;
      }

      return selectedStatementById;
    }, {});

    return (
      <div className="container">
        <h1 className="ui center aligned icon header" style={{ marginTop: '20px' }}>
          <i className="circular calculator icon"></i>
          <div className="ui huge header">Your Bill</div>
        </h1>
        <div>
          {
            bill.statements.length < 1 || selectedStatement.fetching ?
              <div className="ui active inverted dimmer">
                <div className="ui large text loader">Preparing your bill</div>
              </div>
            :
              <div>
                <Overview
                  generated={selectedStatement.overview.generated}
                  due={selectedStatement.overview.due}
                  billFrom={selectedStatement.overview.period.from}
                  billTo={selectedStatement.overview.period.to}
                  total={selectedStatement.overview.total}
                  chargeBreakdown={selectedStatement.charges}
                />
                <ChargeList />
              </div>
          }

        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  bill: state.bill
});

const mapDispatchToProps = (dispatch) => ({
  fetchStatement: () => dispatch(fetchStatement()),
});

export default connect(mapStateToProps, mapDispatchToProps)(BillApp);
