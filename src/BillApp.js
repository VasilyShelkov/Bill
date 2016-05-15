import React, { Component } from 'react';

class BillApp extends Component {
  componentDidMount() {
    console.log('mounts');
  }

  render() {
    return (
      <div className="container">
        <h1 className="ui center aligned icon header" style={{ marginTop: '20px' }}>
          <i className="circular calculator icon"></i>
          <div className="ui huge header">Your Bill</div>
        </h1>
      </div>
    );
  }
}

export default BillApp;
