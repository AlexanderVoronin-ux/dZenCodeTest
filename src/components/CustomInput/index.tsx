import React, {FC} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import {colors} from '../../../assets/colors';
import {IconTypes} from '../../constants/svgIcons/icons';
import {SVGIcon} from '../../constants/svgIcons';
import * as S from './styles';

interface ICustomInputProps extends TextInputProps {
  label: string;
  value: string;
  setValue?: (value: string) => void;
  placeholder?: string;
  secureTextEntry?: boolean;
  validationMessage?: string;
  rightIcon?: IconTypes;
  onPress?: () => void;
  onLongPress?: () => void;
  selectInput?: boolean;
  style?: ViewStyle;
}

export const CustomInput: FC<ICustomInputProps> = ({
  label,
  value,
  setValue,
  placeholder,
  secureTextEntry,
  validationMessage,
  rightIcon,
  onPress,
  onLongPress,
  selectInput,
  style,
  maxLength,
  ...rest
}) => {
  return (
    <View>
      {!!label && (
        <View style={S.LABEL_CTR}>
          <Text
            style={{color: !!validationMessage ? colors.red : colors.black}}>
            {label}
          </Text>
        </View>
      )}

      <View style={[S.CTR, style]}>
        <TextInput
          {...rest}
          style={[S.INPUT, style]}
          value={value}
          placeholder={placeholder}
          secureTextEntry={secureTextEntry}
        />
        {rightIcon && (
          <TouchableOpacity
            style={S.SEND_BTN}
            onPress={onPress}
            onLongPress={onLongPress}>
            <SVGIcon name={rightIcon} width={20} height={20} />
          </TouchableOpacity>
        )}
      </View>
      {!!maxLength && (
        <Text style={{textAlign: 'right', color: colors.black}}>
          {`${value?.length} / ${300 - value?.length}`}
        </Text>
      )}
      {!!validationMessage && (
        <Text style={S.VALID_TEXT}>{validationMessage}</Text>
      )}
    </View>
  );
};
