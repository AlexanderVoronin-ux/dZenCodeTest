import {combineReducers} from '@reduxjs/toolkit';
import themeReducer from '../store/reducers/theme';
import appReducer from '../store/reducers/app';

export const rootReducer = combineReducers({
  theme: themeReducer,
  app: appReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
