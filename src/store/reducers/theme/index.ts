import {createSlice} from '@reduxjs/toolkit';

type TThemeState = 'light' | 'dark';

export interface IAuthState {
  mode: TThemeState;
}

const initialState: IAuthState = {
  mode: 'light',
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {},
});

export default themeSlice.reducer;
