import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { globalStyles } from '~/constants/globalStyles';
import { myColors } from '~/constants/myColors';
import MyText from './MyText';

const Loading = ({ title }: { title?: string }) => (
  <View style={[globalStyles.centralizer, styles.container]}>
    {!!title && <MyText style={styles.loading}>{title}</MyText>}
    <ActivityIndicator color={myColors.loading} size='large' />
  </View>
);

const styles = StyleSheet.create({
  container: {
    minHeight: 150,
  },
  loading: {
    color: myColors.text3,
    fontSize: 16,
    marginBottom: 16,
  },
});

export default Loading;
