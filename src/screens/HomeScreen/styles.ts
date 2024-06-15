import {ImageStyle, TextStyle, ViewStyle} from 'react-native';
import {Colors} from '../../constants/theme';
import {fonts} from '../../constants/fonts';

export const SAFE_AREA = (theme: Colors): ViewStyle => ({
  flex: 1,
  padding: 10,
  backgroundColor: theme.backgroundColor,
});

export const MESSAGE_CTR: ViewStyle = {
  marginBottom: 10,
  padding: 10,
  borderWidth: 1,
  borderRadius: 5,
};
export const IMAGE: ImageStyle = {
  borderRadius: 30,
  overflow: 'hidden',
  alignItems: 'center',
};
export const USER_NAME_TXT = (theme: Colors): TextStyle => ({
  fontSize: 16,
  fontFamily: fonts.nunitoBlackItalic,
  color: theme.text,
});
export const TIME_TXT = (theme: Colors): TextStyle => ({
  fontSize: 14,
  fontFamily: fonts.nunitoBlack,
  color: theme.text,
});
export const MESSAGE_TXT = (theme: Colors): TextStyle => ({
  fontSize: 16,
  fontFamily: fonts.NunitoRegular,
  color: theme.text,
  padding: 10,
});
export const HEADER_MES_CTR = (theme: Colors): ViewStyle => ({
  flexDirection: 'row',
  backgroundColor: theme.backgroundMessageCtr,
  alignItems: 'center',
  gap: 10,
  paddingHorizontal: 5,
  flexWrap: 'wrap',
});

export const PAGIN_CTR = (theme: Colors): ViewStyle => ({
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  paddingVertical: 8,
  backgroundColor: theme.backgroundColor,
});
export const PAGIN_BTN = (theme: Colors): ViewStyle => ({
  justifyContent: 'center',
  alignItems: 'center',
  width: 40,
  height: 40,
  borderRadius: 20,
  marginHorizontal: 4,
  backgroundColor: theme.backgroundTabs,
});
export const ACTIVE_BTN: ViewStyle = {
  backgroundColor: '#22c55d',
  width: 50,
  height: 50,
  borderRadius: 25,
};
export const BTN_TEXT = (theme: Colors): TextStyle => ({
  color: theme.text,
});
