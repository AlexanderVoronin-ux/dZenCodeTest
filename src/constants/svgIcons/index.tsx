import * as React from 'react';
import {ImageStyle} from 'react-native';

import {ICONS, IconTypes} from './icons';

export interface IconProps {
  size?: number;
  width?: number;
  height?: number;
  color?: string;
  name: IconTypes;
  style?: ImageStyle;
}

export function SVGIcon({
  name,
  size = 24,
  width,
  height,
  color,
  ...props
}: IconProps): JSX.Element {
  const Icon = ICONS[name] || ICONS.SendSVG;
  return (
    <Icon
      width={width || size}
      height={height || size}
      color={color}
      {...props}
    />
  );
}
