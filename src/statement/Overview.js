import React from 'react';
import moment from 'moment';
import ChargesOverviewPieChart from './ChargesOverviewPieChart';

const Overview = ({ generated, due, billFrom, billTo, total, chargeBreakdown }) => (
  <div className="row">
    <div className="ui raised segment">
      <div className="row">
        <div className="ui center aligned large header">
          <div className="col-xs-6">
            {moment(billFrom).format('MMMM Do YYYY')}
          </div>
          <div className="ui vertical divider">
            until
          </div>
          <div className="col-xs-6">
            {moment(billTo).format('MMMM Do YYYY')}
          </div>
        </div>
      </div>
    </div>
    <div className="ui raised segment" style={{ height: 300 }}>
      <div className="row">
        <ChargesOverviewPieChart charges={chargeBreakdown} height={300} />
      </div>
    </div>
  </div>
);

export default Overview;
