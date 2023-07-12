import React from 'react';
import {
  StyleProp,
  ViewStyle,
  TextStyle,
  StyleSheet,
  GestureResponderEvent,
} from 'react-native';
import { myFonts } from '~/constants/myFonts';
import { device } from '~/constants/device';
import MyText from './MyText';
import MyTouchable from './MyTouchable';
import MyIcon, { IconName, MyIconProps } from './MyIcon';

type MyButtonProps = {
  onPress?: (event: GestureResponderEvent) => void;
  title: string;
  icon?: IconName | MyIconProps;
  image?: React.ReactNode;
  iconRight?: boolean;
  disabled?: boolean;
  type?: 'solid' | 'outline' | 'clear';
  buttonStyle?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
};

/**
 * Use `onPress` if want a button, or `screen` if want a link.
 */
const MyButton = ({
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onPress,
  title,
  image,
  icon,
  iconRight = false,
  disabled = false,
  type = 'solid',
  buttonStyle,
  titleStyle,
}: MyButtonProps) => {
  const baseStyle: ViewStyle = {
    borderRadius: 4,
    minHeight: 44,
    minWidth: 44,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: iconRight ? 'row-reverse' : 'row',
    // `padding` overwrite other paddings
    paddingTop: 8,
    paddingRight: 8,
    paddingBottom: 8,
    paddingLeft: 8,
    ...{ transitionDuration: '200ms' },
  };

  const hoverColor = '#48a2eb';
  const solidTextColor = !disabled ? 'white' : '#99a1a8';
  const textColor = !disabled ? hoverColor : '#9CA3AA';
  const backgroundColor = !disabled ? hoverColor : '#E3E6E8';

  const typeStyle = StyleSheet.create({
    solid: {
      backgroundColor,
    },
    outline: {
      borderColor: textColor,
      borderWidth: 1,
    },
    clear: {},
  })[type];

  const buttonText = (
    <>
      {image}
      {icon && (
        <MyIcon {...(typeof icon === 'string' ? { name: icon } : icon)} />
      )}
      <MyText
        style={[
          {
            color: type === 'solid' ? solidTextColor : textColor,
            fontFamily: device.android ? myFonts.Medium : myFonts.Regular,
            fontSize: 16,
          },
          titleStyle,
        ]}>
        {title}
      </MyText>
    </>
  );

  return (
    <MyTouchable
      solid={type === 'solid'}
      style={[baseStyle, typeStyle, buttonStyle]}
      {...{ onPress, disabled }}>
      {buttonText}
    </MyTouchable>
  );
};

export default MyButton;
