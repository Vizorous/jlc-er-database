/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { hydrate, render } from 'react-dom';
// import { createStore } from 'redux';
// import { Provider } from 'react-redux';
import App from './App';
// import rootReducer from './reducers';

const rootElement = document.getElementById('root');
if (rootElement.hasChildNodes()) {
  hydrate(
    // <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>, // </Provider>

    rootElement,

  );
} else {
  render(
    // <Provider store={store}>

    <BrowserRouter>
      <App />
    </BrowserRouter>, // </Provider>

    rootElement,
  );
}


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
