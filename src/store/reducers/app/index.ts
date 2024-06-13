import {createSlice, PayloadAction} from '@reduxjs/toolkit';

type TAppState = boolean;

export interface IAppState {
  isAppConnect: TAppState;
}

const initialState: IAppState = {
  isAppConnect: false,
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setAppConnection(state, {payload}: PayloadAction<TAppState>) {
      state.isAppConnect = payload;
    },
  },
});

export const {setAppConnection} = appSlice.actions;

export default appSlice.reducer;
