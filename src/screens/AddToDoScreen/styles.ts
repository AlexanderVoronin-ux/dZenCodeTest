import {TextStyle, ViewStyle} from 'react-native';
import {colors} from '../../../assets/colors';

export const SAFE_AREA: ViewStyle = {
  flex: 1,
};
export const MT10: ViewStyle = {
  marginTop: 10,
};
export const KEYBOARD_AWARE_CTR: ViewStyle = {
  flex: 1,
  paddingTop: 29,
  paddingHorizontal: 16,
};

export const TEXT_MESSAGES: TextStyle = {
  paddingTop: 16,
  fontSize: 16,
  textDecorationLine: 'underline',
  color: colors.black,
};
