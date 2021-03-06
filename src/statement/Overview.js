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
    <div className="row">
      <ChargesOverviewPieChart charges={chargeBreakdown} height={400} />
      <div
        className="ui center aligned icon large header"
        style={{ color: moment(due).isSameOrBefore(moment()) ? 'red' : 'green' }}
      >
        <i className="small payment icon"></i>£{total}
        <div>to be payed by {moment(due).fromNow()}</div>
      </div>
    </div>
  </div>
);

export default Overview;
