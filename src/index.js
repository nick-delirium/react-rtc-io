import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, compose, applyMiddleware } from "redux";
import createSagaMiddleware from 'redux-saga'

import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import setupSocket from "./socketApi.js";
import reducer from "./store/reducers";
import handleNewMessage from './store/sagas'

const sagaMiddleware = createSagaMiddleware()
const store = createStore(
  reducer,
  compose(
    applyMiddleware(sagaMiddleware),
    typeof window === "object" &&
    typeof window.devToolsExtension !== "undefined"
      ? window.devToolsExtension()
      : f => f
  )
)
const socket = setupSocket(store.dispatch);
sagaMiddleware.run(handleNewMessage, { socket })

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
