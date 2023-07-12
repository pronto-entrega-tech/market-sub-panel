import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  Animated,
  StyleProp,
  ViewStyle,
  Pressable,
} from 'react-native';
import { device } from '~/constants/device';
import { myColors } from '~/constants/myColors';
import { zIndex } from '~/constants/zIndex';
import { ModalState } from '~/hooks/useModalState';

const CenterModal = ({
  state: { isVisible, onDismiss: dismiss },
  style,
  children,
}: {
  state: Partial<ModalState>;
  style?: StyleProp<ViewStyle>;
  children: React.ReactNode;
}) => {
  const [show, setShow] = useState(false);
  const [state] = useState({ opacity: new Animated.Value(0) });

  useEffect(() => {
    if (isVisible) setShow(true);

    Animated.timing(state.opacity, {
      toValue: isVisible ? 1 : 0,
      duration: 200,
      useNativeDriver: !device.web,
    }).start(() => setShow(!!isVisible));
  }, [isVisible, state.opacity]);

  return !show ? null : (
    <Animated.View
      style={[
        StyleSheet.absoluteFill,
        styles.container,
        { opacity: state.opacity },
      ]}>
      <Pressable style={StyleSheet.absoluteFill} onPress={dismiss} />
      <View style={[styles.modal, style]}>{children}</View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    zIndex: zIndex.Modal,
    position: !device.web ? 'absolute' : ('fixed' as any),
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modal: {
    alignSelf: 'center',
    position: 'absolute',
    width: '90%',
    maxWidth: 500,
    padding: 24,
    borderRadius: 10,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 18,
    color: myColors.text4,
  },
  subtitle: {
    color: myColors.text2,
  },
});

export default CenterModal;
