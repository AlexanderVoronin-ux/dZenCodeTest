import {ImageStyle, TextStyle, ViewStyle} from 'react-native';
import {colors} from '../../../assets/colors';

export const SAFE_AREA = (color: string): ViewStyle => ({
  flex: 1,
  backgroundColor: color,
});
export const MT10: ViewStyle = {
  marginTop: 10,
};
export const KEYBOARD_AWARE_CTR = (color: string): ViewStyle => ({
  flex: 1,
  paddingTop: 29,
  paddingHorizontal: 16,
  backgroundColor: color,
});

export const TEXT_MESSAGES: TextStyle = {
  paddingTop: 16,
  fontSize: 16,
  textDecorationLine: 'underline',
  color: colors.black,
};

export const SEND_BTN: ViewStyle = {
  height: 100,
  width: 100,
  backgroundColor: colors.pink,
  marginBottom: 20,
  borderColor: colors.white_1,
  borderWidth: 1,
  borderRadius: 5,
  alignItems: 'center',
  justifyContent: 'center',
  overflow: 'hidden',
};
export const DELETE_BTN: ViewStyle = {
  position: 'absolute',
  top: -10,
  right: -10,
  zIndex: 1,
  backgroundColor: colors.white,
  borderColor: colors.white_1,
  borderRadius: 50,
  borderWidth: 1,
};
export const DELETE_CTR: ViewStyle = {height: 100, width: 100};
export const AVATAR_IMG: ImageStyle = {height: 100, width: 100};
