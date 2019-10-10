import { createStore, applyMiddleware } from 'redux';
import { persistStore } from 'redux-persist';
import thunk from 'redux-thunk';


import rootReducer from './root-reducer';


let middlewares = [thunk];
if (process.env.NODE_ENV !== 'production') {
  const logger = import('redux-logger');
  middlewares = [logger, ...middlewares];
}

export const store = createStore(rootReducer, applyMiddleware(...middlewares));

export const persistor = persistStore(store);
