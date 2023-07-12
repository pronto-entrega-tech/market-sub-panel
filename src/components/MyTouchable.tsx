import React from 'react';
import {
  View,
  TouchableNativeFeedback,
  StyleProp,
  ViewStyle,
  Insets,
  GestureResponderEvent,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native';
import { device } from '~/constants/device';

type MyTouchableProps = {
  onPress?: (event: GestureResponderEvent) => void;
  children?: React.ReactNode;
  disabled?: boolean;
  hitSlop?: Insets;
  style?: StyleProp<ViewStyle>;
  solid?: boolean;
};

const MyTouchable = ({
  onPress,
  children,
  disabled,
  hitSlop,
  style,
  solid,
}: MyTouchableProps) => {
  if (device.iOS) {
    const TouchableHybrid: any = solid ? TouchableHighlight : TouchableOpacity;
    return (
      <TouchableHybrid
        underlayColor='#68b5f2'
        disabled={disabled}
        onPress={onPress}
        style={style}>
        <>{children}</>
      </TouchableHybrid>
    );
  }

  // if android
  return (
    <TouchableNativeFeedback
      useForeground
      background={
        solid
          ? TouchableNativeFeedback.Ripple('rgba(255, 255, 255, .32)', false)
          : undefined
      }
      hitSlop={hitSlop}
      disabled={disabled}
      onPress={onPress}>
      <View style={[{ overflow: 'hidden' }, style]}>{children}</View>
    </TouchableNativeFeedback>
  );
};

export default MyTouchable;
