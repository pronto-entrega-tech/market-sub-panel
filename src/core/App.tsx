import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';
import React, { useCallback, useEffect, useState } from 'react';
import { SWRConfig } from 'swr';
import MyAlert from '~/components/MyAlert';
import MyToast from '~/components/MyToast';
import { fonts } from '~/constants/myFonts';
import SignIn from '~/pages/SignIn';
import { apiUtils } from '~/services/api/utils';
import BottomTabs from './BottomTabs';
import { useMyContext } from './context';
import { StyleSheet, View } from 'react-native';
import {
  checkTasks,
  registerBackgroundFetchAsync,
  unregisterBackgroundFetchAsync,
} from './tasks';
import { AppContexts } from './AppContexts';
import * as Notifications from 'expo-notifications';
import { setDefaultOptions } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { useConnection } from '~/functions/connection';

setDefaultOptions({
  locale: ptBR,
});

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

SplashScreen.preventAutoHideAsync();

const App = () => {
  const { isAuthed } = useMyContext();
  const [isReady, setReady] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        await Font.loadAsync(fonts);
      } catch (err) {
        console.error(err);
      } finally {
        setReady(true);
      }
    })();
  }, []);

  useEffect(() => {
    if (isAuthed === undefined) return;

    isAuthed
      ? registerBackgroundFetchAsync()
      : unregisterBackgroundFetchAsync();
  }, [isAuthed]);

  const onLayoutRootView = useCallback(async () => {
    if (isReady) await SplashScreen.hideAsync();
  }, [isReady]);

  if (!isReady || isAuthed === undefined) return null;

  return (
    <View style={StyleSheet.absoluteFill} onLayout={onLayoutRootView}>
      {isAuthed ? <BottomTabs /> : <SignIn />}
    </View>
  );
};

const CheckTasks = () => {
  const { isAuthed } = useMyContext();
  const hasConnection = useConnection() ?? true;

  useEffect(() => {
    if (!isAuthed || !hasConnection) return;

    checkTasks();
  }, [isAuthed, hasConnection]);

  return null;
};

const AppRoot = () => (
  <AppContexts>
    <SWRConfig
      value={{
        fetcher: (url) =>
          apiUtils.apiCall.get(url, apiUtils.authHeader()).then((v) => v.data),
      }}>
      <App />
      <MyAlert />
      <MyToast />
      <CheckTasks />
    </SWRConfig>
  </AppContexts>
);

export default AppRoot;
