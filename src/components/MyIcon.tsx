import React from 'react';
import { StyleProp, TextStyle } from 'react-native';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import { myColors } from '~/constants/myColors';

export type IconName = keyof typeof Icon.glyphMap;
export const iconNames = Object.keys(Icon.glyphMap) as IconName[];

export type MyIconProps = {
  name: IconName;
  /**
   * @default primaryColor
   */
  color?: string;
  /**
   * @default 24
   */
  size?: number;
  style?: StyleProp<TextStyle>;
};
const MyIcon = ({
  name,
  color = myColors.primaryColor,
  size = 24,
  style,
}: MyIconProps) => <Icon name={name} color={color} size={size} style={style} />;

export default MyIcon;
