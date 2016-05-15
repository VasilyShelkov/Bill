import 'babel-polyfill';
import ReactDOM from 'react-dom';
import React from 'react';
import BillApp from './BillApp';
const rootElement = document.getElementById('root');

let render = () => {
  ReactDOM.render(
		<BillApp />,
		rootElement
	);
};

if (module.hot) {
  // Support hot reloading of components
  const renderApp = render;

  // and display an overlay for runtime errors
  const renderError = (error) => {
    const RedBox = require('redbox-react');
    ReactDOM.render(
      <RedBox error={error} />,
      rootElement
    );
  };

  render = () => {
    try {
      renderApp();
    } catch (error) {
      renderError(error);
    }
  };

  module.hot.accept('./BillApp', () => {
    setTimeout(render);
  });
}

render();
