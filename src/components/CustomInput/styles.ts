import {colors} from '../../../assets/colors';
import {TextStyle, ViewStyle} from 'react-native';

export const CTR: ViewStyle = {
  backgroundColor: colors.white,
  borderColor: colors.white_1,
  borderRadius: 5,
  borderWidth: 1,
  paddingHorizontal: 10,
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
};

export const INPUT: TextStyle = {
  height: 40,
  flex: 1,
  fontSize: 16,
  color: colors.black,
};
export const VALID_TEXT: TextStyle = {
  color: colors.red_1,
};
export const SEND_BTN: ViewStyle = {
  paddingVertical: 10,
  paddingHorizontal: 10,
};
export const LABEL_CTR: ViewStyle = {
  marginBottom: 16,
};
