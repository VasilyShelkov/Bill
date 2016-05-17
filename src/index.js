import 'babel-polyfill';
import ReactDOM from 'react-dom';
import React from 'react';
import { combineReducers, compose, applyMiddleware, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { Provider } from 'react-redux';
import statementsReducer from './statement/statementsReducer';
import BillApp from './BillApp';

const bills = combineReducers({
  bill: statementsReducer,
});

const middlewares = [thunkMiddleware];

const finalStore = createStore(
  bills,
  compose(
    applyMiddleware(...middlewares),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
);

const rootElement = document.getElementById('root');

let render = () => {
  ReactDOM.render(
    <Provider store={finalStore}>
      <BillApp />
    </Provider>,
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
