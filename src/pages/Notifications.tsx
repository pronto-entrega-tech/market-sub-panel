import React from 'react';
import { View, StyleSheet } from 'react-native';
import Loading from '~/components/Loading';
import MyDivider from '~/components/MyDivider';
import MyHeader from '~/components/MyHeader';
import MyIcon from '~/components/MyIcon';
import MyText from '~/components/MyText';
import { globalStyles } from '~/constants/globalStyles';
import { myColors } from '~/constants/myColors';
import { useNotifsContext } from '~/contexts/NotifsContext';
import { Notif } from '~/core/types';
import { useTimeAgoMsg } from '~/hooks/useTimeAgoMsg';

const NotificationsBody = () => {
  const { notifs } = useNotifsContext();

  if (!notifs) return <Loading />;
  if (!notifs.length) return <Nothing />;

  return (
    <>
      {notifs.map((notif) => (
        <NotificationItem key={notif.title + +notif.created_at} notif={notif} />
      ))}
    </>
  );
};

const NotificationItem = ({ notif }: { notif: Notif }) => {
  const { title, created_at } = notif;
  const timeAgoMsg = useTimeAgoMsg(created_at);

  return (
    <>
      <View style={styles.taskContainer}>
        <MyIcon name='shopping-outline' color='#636363' size={32} />
        <View style={{ marginLeft: 16, flexGrow: 1 }}>
          <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
            <MyText style={{ color: myColors.text4, fontSize: 17 }}>
              {title} {timeAgoMsg}
            </MyText>
          </View>
        </View>
      </View>
      <MyDivider style={styles.divider} />
    </>
  );
};

const Nothing = () => (
  <View
    style={[
      globalStyles.centralizer,
      { backgroundColor: myColors.background },
    ]}>
    <MyText style={{ fontSize: 15, color: myColors.text2 }}>
      Nenhuma notificação ainda
    </MyText>
  </View>
);

const Notifications = () => (
  <>
    <MyHeader title='Notificações' />
    <NotificationsBody />
  </>
);

const styles = StyleSheet.create({
  taskContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 8,
    alignItems: 'center',
  },
  divider: {
    backgroundColor: myColors.divider2,
    marginTop: 4,
    marginHorizontal: 16,
  },
});

export default Notifications;
