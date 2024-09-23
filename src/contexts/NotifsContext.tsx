import { useCallback, useState, useEffect } from "react";
import * as Notifications from "expo-notifications";
import { createContext } from "~/functions/createContext";
import { Notif } from "~/core/types";
import { store } from "~/services/store";

const useNotifs = () => {
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

export const [NotifsProvider, useNotifsContext, useNotifsSelector] =
  createContext(useNotifs);
