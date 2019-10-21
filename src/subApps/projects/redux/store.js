import { createStore, applyMiddleware } from 'redux';
import { persistStore } from 'redux-persist';
import thunk from 'redux-thunk';
// eslint-disable-next-line import/no-extraneous-dependencies
import { composeWithDevTools } from 'redux-devtools-extension';

import rootReducer from './root-reducer';

const middlewares = [thunk];

export const configureStore = () => {
  const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(...middlewares)));
  return store;
};

export const store = configureStore();

export const persistor = persistStore(store);
