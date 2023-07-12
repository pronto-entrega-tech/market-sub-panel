import React from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { globalStyles } from '~/constants/globalStyles';
import { device } from '~/constants/device';

const ScannerMask = () => (
  <View style={[StyleSheet.absoluteFill, globalStyles.centralizer]}>
    <View style={[{ width: '70%', aspectRatio: 1 }]}>
      <View style={styles.maskBase}>
        <Square />
      </View>
      <View style={[styles.maskBase, { right: 0 }]}>
        <Square style={{ right: 0 }} />
      </View>
      <View style={[styles.maskBase, { bottom: 0 }]}>
        <Square style={{ bottom: 0 }} />
      </View>
      <View style={[styles.maskBase, { right: 0, bottom: 0 }]}>
        <Square style={{ right: 0, bottom: 0 }} />
      </View>
    </View>
  </View>
);

const Square = ({ style }: { style?: StyleProp<ViewStyle> }) => (
  <View
    style={[
      {
        width: device.width * 0.8,
        aspectRatio: 1,
        borderColor: 'white',
        borderWidth: 5,
        borderRadius: 14,
        position: 'absolute',
      },
      style,
    ]}
  />
);

const styles = StyleSheet.create({
  maskBase: {
    width: 60,
    aspectRatio: 1,
    overflow: 'hidden',
    position: 'absolute',
  },
});

export default ScannerMask;
