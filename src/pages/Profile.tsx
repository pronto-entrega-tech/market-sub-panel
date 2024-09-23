import React from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import MyButton from '~/components/MyButton';
import MyIcon, { IconName } from '~/components/MyIcon';
import MyDivider from '~/components/MyDivider';
import MyText from '~/components/MyText';
import { useProfile } from '~/hooks/useProfile';
import { globalStyles } from '~/constants/globalStyles';
import { myColors } from '~/constants/myColors';
import { myFonts } from '~/constants/myFonts';
import { useNavigation } from '@react-navigation/native';
import { ScreenName } from '~/core/types';
import { useMyContext } from '~/core/context';
import { useLoading } from '~/hooks/useLoading';
import Loading from '~/components/Loading';
import { SkeletonText } from '~/components/Skeleton';

type CardData = {
  icon: IconName;
  title: string;
} & ({ screen: ScreenName } | { onPress: () => void });

const Profile = () => {
  const { signOut } = useMyContext();
  const { data: profile } = useProfile();
  const [isExiting, , withExiting] = useLoading();

  if (isExiting) return <Loading title='Saindo' />;

  const cardsData: CardData[] = [
    {
      icon: 'qrcode-scan',
      title: 'Fila de confirmações',
      screen: 'Tasks',
    },
    {
      icon: 'bell',
      title: 'Notificações',
      screen: 'Notifications',
    },
    // {
    //   icon: 'help-circle',
    //   title: 'Central de ajuda',
    //   screen: '' /* 'Help' */,
    // },
    // {
    //   icon: 'cog',
    //   title: 'Configurações',
    //   screen: '' /* 'Config' */,
    // },
    {
      icon: 'monitor-cellphone',
      title: 'Dispositivos conectados',
      screen: 'Devices',
    },
    {
      icon: 'exit-to-app',
      title: 'Sair',
      onPress: withExiting(signOut),
    },
  ];

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={globalStyles.notch}
      contentContainerStyle={{ paddingBottom: 68 }}>
      <>
        <View style={styles.header}>
          <MyIcon
            name='account-circle-outline'
            color={myColors.grey4}
            size={100}
          />
          {profile ? (
            <MyText style={styles.name}>{profile.name}</MyText>
          ) : (
            <SkeletonText width={120} />
          )}
        </View>
        <View
          style={[
            styles.cardsContainer,
            globalStyles.elevation3,
            globalStyles.darkBorder,
          ]}>
          {cardsData.map((card, index) => (
            <CardItem
              key={index}
              {...{ card, index, length: cardsData.length }}
            />
          ))}
        </View>
      </>
    </ScrollView>
  );
};

const CardItem = ({
  card,
  index,
  length,
}: {
  card: CardData;
  index: number;
  length: number;
}) => {
  const { navigate } = useNavigation();

  const { title, icon } = card;

  return (
    <View>
      {index !== 0 && <MyDivider style={styles.divider} />}
      <View style={{ justifyContent: 'center' }}>
        <MyIcon
          style={{
            position: 'absolute',
            alignSelf: 'flex-end',
            right: 4,
          }}
          name='chevron-right'
          size={32}
          color={myColors.grey2}
        />
        <MyButton
          onPress={
            'onPress' in card
              ? card.onPress
              : () => navigate(card.screen as any)
          }
          title={title}
          icon={{
            name: icon,
            size: 28,
            color: myColors.primaryColor,
          }}
          buttonStyle={[
            styles.button,
            index === 0
              ? styles.top
              : index === length - 1
                ? styles.bottom
                : { borderRadius: 0 },
          ]}
          titleStyle={{
            color: myColors.text2,
            fontSize: 17,
            marginLeft: 6,
          }}
          type='clear'
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 30,
    paddingBottom: 22,
    paddingTop: 18,
  },
  name: {
    fontSize: 22,
    color: myColors.grey4,
    fontFamily: myFonts.Bold,
    marginLeft: 16,
    flexShrink: 1,
  },
  cardsContainer: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 8,
  },
  top: {
    borderRadius: 0,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  bottom: {
    borderRadius: 0,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  divider: {
    backgroundColor: myColors.divider3,
    marginHorizontal: 8,
  },
  button: {
    justifyContent: 'flex-start',
    paddingLeft: 10,
    paddingVertical: 9,
  },
});

export default Profile;
