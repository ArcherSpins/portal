import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import projectReducer from './project/project.reducer';
import milestoneReducer from './milestone/milestone.reducer';
import errorReducer from './error/error.reducer';
import taskReducer from './task/task.reducer';
import logReducer from './log/log.reducer';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['project', 'milestone', 'task', 'log', 'error'],
};

const rootReducer = combineReducers({
  project: projectReducer,
  milestone: milestoneReducer,
  error: errorReducer,
  task: taskReducer,
  log: logReducer,
});

export default persistReducer(persistConfig, rootReducer);
