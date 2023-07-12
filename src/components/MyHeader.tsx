import React from 'react';
import { View, StyleSheet } from 'react-native';
import IconButton from './IconButton';
import MyDivider from './MyDivider';
import MyText from './MyText';
import { globalStyles } from '~/constants/globalStyles';
import { myColors } from '~/constants/myColors';
import { myFonts } from '~/constants/myFonts';
import { useNavigation } from '@react-navigation/native';

const MyHeader = ({
  title,
  onGoBack,
  goBackLess,
  notchLess,
  dividerLess,
  smallDivider,
  rightIcon,
}: {
  title?: string;
  onGoBack?: () => void;
  goBackLess?: boolean;
  notchLess?: boolean;
  dividerLess?: boolean;
  smallDivider?: boolean;
  rightIcon?: JSX.Element;
}) => {
  return (
    <>
      <View style={[styles.header, !notchLess && globalStyles.notch]}>
        {!goBackLess && <GoBackButton onGoBack={onGoBack} />}
        <MyText style={styles.textHeader}>{title}</MyText>
        <View style={styles.rightIcon}>{rightIcon}</View>
      </View>
      {!dividerLess && (
        <MyDivider
          style={[styles.divider, { marginHorizontal: smallDivider ? 16 : 0 }]}
        />
      )}
    </>
  );
};

const GoBackButton = ({ onGoBack }: { onGoBack?: () => void }) => {
  const navigation = useNavigation();
  const goBack = onGoBack ?? navigation.goBack;

  return <IconButton icon='arrow-left' type='back' onPress={goBack} />;
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: myColors.background,
    justifyContent: 'center',
    height: 56,
  },
  textHeader: {
    color: myColors.primaryColor,
    fontSize: 20,
    fontFamily: myFonts.Bold,
    position: 'absolute',
    alignSelf: 'center',
    textAlign: 'center',
  },
  rightIcon: {
    position: 'absolute',
    right: 0,
  },
  divider: {
    backgroundColor: myColors.divider2,
    marginTop: -1,
  },
});

export default MyHeader;
