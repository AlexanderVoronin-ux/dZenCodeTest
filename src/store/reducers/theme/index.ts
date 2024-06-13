import {createSlice, PayloadAction} from '@reduxjs/toolkit';

type TThemeState = 'light' | 'dark';

export interface IThemeState {
  mode: TThemeState;
}

const initialState: IThemeState = {
  mode: 'light',
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme(state, {payload}: PayloadAction<TThemeState>) {
      state.mode = payload;
    },
  },
});

export const {setTheme} = themeSlice.actions;

export default themeSlice.reducer;
