import { createStore, compose, applyMiddleware } from "redux";
import createSagaMiddleware from 'redux-saga'

import reducer from "./reducers";
import handleNewMessage from './sagas'

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


sagaMiddleware.run(handleNewMessage )

export default store;