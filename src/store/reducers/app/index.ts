import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Message} from '../../../screens';

type TAppState = boolean;

export interface IAppState {
  isAppConnect: TAppState;
  messages: Message[];
  loading: boolean;
}

const initialState: IAppState = {
  isAppConnect: false,
  messages: [],
  loading: false,
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setLoading(state, {payload}: PayloadAction<boolean>) {
      state.loading = payload;
    },
    setAppConnection(state, {payload}: PayloadAction<TAppState>) {
      state.isAppConnect = payload;
    },
    updateMessages(state, {payload}: PayloadAction<Message>) {
      state.messages = [...state.messages, payload];
    },
    updateMessagesFromDataBase(state, {payload}: PayloadAction<Message[]>) {
      const idsInPayload = new Set(payload.map(item => item.id));
      const filteredStateArray = state.messages.filter(
        item => !idsInPayload.has(item.id),
      );
      state.messages = [...payload, ...filteredStateArray];
    },
  },
});

export const {
  setAppConnection,
  updateMessages,
  setLoading,
  updateMessagesFromDataBase,
} = appSlice.actions;

export default appSlice.reducer;
