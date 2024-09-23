import AsyncStorage from '@react-native-async-storage/async-storage';
import { Notif, Task } from '~/core/types';
import { transformNotif } from '~/functions/transform';

const prefix = '@prontoentrega:';

const key = {
  isNewUser: prefix + 'isNewUser',
  refreshToken: prefix + 'refreshToken',
  tasks: prefix + 'tasks',
  notif: prefix + 'notif',
};

export const store = {
  setIsNewUser: async (isNewUser: boolean) => {
    if (!isNewUser) {
      await AsyncStorage.setItem(key.isNewUser, 'false');
    } else {
      await AsyncStorage.removeItem(key.isNewUser);
    }
  },

  getIsNewUser: async () => {
    const value = await AsyncStorage.getItem(key.isNewUser);
    return value !== 'false';
  },

  setRefreshToken: async (value: string | null) => {
    if (value) {
      await AsyncStorage.setItem(key.refreshToken, value);
    } else {
      await AsyncStorage.removeItem(key.refreshToken);
    }
  },

  getRefreshToken: async () => {
    return AsyncStorage.getItem(key.refreshToken);
  },

  setTasks: async (value: Task[]) => {
    await AsyncStorage.setItem(key.tasks, JSON.stringify(value));
  },

  getTasks: async () => {
    const item = await AsyncStorage.getItem(key.tasks);

    return item ? (JSON.parse(item) as Task[]) : [];
  },

  setNotifs: async (value: Notif[]) => {
    await AsyncStorage.setItem(key.notif, JSON.stringify(value));
  },

  getNotifs: async () => {
    const item = await AsyncStorage.getItem(key.notif);

    return item ? (JSON.parse(item) as Notif[]).map(transformNotif) : [];
  },
};
