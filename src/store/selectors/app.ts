import {RootState} from '../rootReducer';

export const s_App = (state: RootState) => state.app.isAppConnect;
export const s_Messages = (state: RootState) => state.app.messages;
export const s_Loading = (state: RootState) => state.app.loading;
