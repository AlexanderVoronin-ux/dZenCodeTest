import {combineReducers} from '@reduxjs/toolkit';
import themeReducer from '../store/reducers/theme';

export const rootReducer = combineReducers({
  auth: themeReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
