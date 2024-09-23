import React, { useCallback, useState, ReactNode, useEffect } from "react";
import { createContext } from "use-context-selector";
import * as Notifications from "expo-notifications";
import { createUseContext } from "~/functions/createUseContext";
import { Notif } from "~/core/types";
import { store } from "~/services/store";

const useProviderValues = () => {
  const [notifs, setNotifs] = useState<Notif[]>();

  useEffect(() => {
    store.getNotifs().then(setNotifs);
  }, []);

  const addNotif = useCallback(
    (title: string) => {
      const setAsync = async () => {
        const newNotifs = [
          { title, created_at: new Date() },
          ...(await store.getNotifs()),
        ];
        store.setNotifs(newNotifs);
        setNotifs(newNotifs);
      };

      setNotifs((notifs) => {
        if (notifs) {
          const newNotifs = [{ title, created_at: new Date() }, ...notifs];
          store.setNotifs(newNotifs);
          return newNotifs;
        } else {
          setAsync();
          return notifs;
        }
      });

      Notifications.scheduleNotificationAsync({
        content: { title },
        trigger: null,
      });
    },
    [setNotifs],
  );

  return {
    notifs,
    addNotif,
  };
};

type NotifsContextValues = ReturnType<typeof useProviderValues>;

const NotifsContext = createContext({} as NotifsContextValues);

export const useNotifsContext = createUseContext(NotifsContext);

export const NotifsProvider = (props: { children: ReactNode }) => (
  <NotifsContext.Provider value={useProviderValues()} {...props} />
);
