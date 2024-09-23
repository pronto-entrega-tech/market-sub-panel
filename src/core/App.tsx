import * as SplashScreen from "expo-splash-screen";
import React, { useCallback, useEffect } from "react";
import { SWRConfig } from "swr";
import MyAlert from "~/components/MyAlert";
import MyToast from "~/components/MyToast";
import SignIn from "~/pages/SignIn";
import { apiUtils } from "~/services/api/utils";
import BottomTabs from "./BottomTabs";
import { useMyContext } from "./context";
import { StyleSheet, View } from "react-native";
import {
  checkTasks,
  registerBackgroundFetchAsync,
  unregisterBackgroundFetchAsync,
} from "./tasks";
import { AppContexts } from "./AppContexts";
import * as Notifications from "expo-notifications";
import { setDefaultOptions } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useConnection } from "~/functions/connection";
import { StatusBar } from "expo-status-bar";

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

  useEffect(() => {
    if (isAuthed === undefined) return;

    if (isAuthed) {
      registerBackgroundFetchAsync();
    } else {
      unregisterBackgroundFetchAsync();
    }
  }, [isAuthed]);

  const onLayoutRootView = useCallback(async () => {
    await SplashScreen.hideAsync();
  }, []);

  if (isAuthed === undefined) return null;

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
      }}
    >
      <StatusBar />
      <App />
      <MyAlert />
      <MyToast />
      <CheckTasks />
    </SWRConfig>
  </AppContexts>
);

export default AppRoot;
