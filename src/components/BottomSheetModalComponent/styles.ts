import {TextStyle, ViewStyle} from 'react-native';

import {fonts} from '../../constants/fonts';
import {Colors} from '../../constants/theme';
import {colors} from '../../../assets/colors';

export const TEXT_MODAL_CTR: ViewStyle = {
  width: '100%',
  padding: 10,
};

export const TITLE_MODAL = (theme: Colors, isSelected: boolean): TextStyle => ({
  fontFamily: fonts.NunitoRegular,
  fontSize: 16,
  color: theme.text,
  textAlign: 'center',
  paddingVertical: 10,
  backgroundColor: isSelected ? colors.white : undefined,
});
