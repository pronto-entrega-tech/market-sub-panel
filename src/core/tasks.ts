import * as BackgroundFetch from 'expo-background-fetch';
import { BackgroundFetchResult } from 'expo-background-fetch';
import * as TaskManager from 'expo-task-manager';
import { api } from '~/services/api';
import { decodeConfirmationToken } from '~/functions/confirmationToken';
import { store } from '~/services/store';
import { getHasConnection } from '~/functions/connection';
import { minute } from '~/constants/time';
import { events } from '~/services/events';

const CHECK_QUEUE_TASK = 'check-queue';

export const checkTasks = async () => {
  const [hasConnection, tasks] = await Promise.all([
    getHasConnection(),
    store.getTasks(),
  ]);

  if (!hasConnection || !tasks.length) return BackgroundFetchResult.NoData;

  const results = await Promise.allSettled(
    tasks.map(async ({ data: { token } }) => {
      const { order_id } = decodeConfirmationToken(token);

      await api.orders.confirm(order_id, token);
    }),
  );

  const remainJobs = tasks.filter((_, i) => results[i].status === 'rejected');

  await store.setTasks(remainJobs);
  events.emit('tasksUpdated', remainJobs);

  return BackgroundFetchResult.NewData;
};

TaskManager.defineTask(CHECK_QUEUE_TASK, checkTasks);

export const registerBackgroundFetchAsync = () =>
  BackgroundFetch.registerTaskAsync(CHECK_QUEUE_TASK, {
    minimumInterval: 15 * minute,
  });

export const unregisterBackgroundFetchAsync = () =>
  BackgroundFetch.unregisterTaskAsync(CHECK_QUEUE_TASK);
