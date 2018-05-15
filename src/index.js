import React from "react";
import ReactDOM from "react-dom";
import App from "./containers/App";
import { Provider } from "react-redux";
import reducers from "./reducers";
import ReduxPromise from "redux-promise";
// import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from "redux";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
ReactDOM.render(
  <Provider
    store={createStore(
      reducers,
      composeEnhancers(applyMiddleware(ReduxPromise))
    )}
  >
    <App />

  </Provider>,
  document.getElementById("root")
);
