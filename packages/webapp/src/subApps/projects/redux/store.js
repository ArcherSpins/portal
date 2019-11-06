import { createStore, applyMiddleware } from 'redux';
import { persistStore } from 'redux-persist';
import createSagaMiddleware from 'redux-saga';

import thunk from 'redux-thunk';
// eslint-disable-next-line import/no-extraneous-dependencies
import { composeWithDevTools } from 'redux-devtools-extension';
import rootSaga from './root-saga';

import rootReducer from './root-reducer';


export const configureStore = () => {
  const sagaMiddleware = createSagaMiddleware();

  const middlewares = [thunk, sagaMiddleware];

  const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(...middlewares)));
  sagaMiddleware.run(rootSaga);
  return store;
};

export const store = configureStore();

export const persistor = persistStore(store);
