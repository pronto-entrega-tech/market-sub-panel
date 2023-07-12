import React, { useCallback, useEffect, useState, ReactNode } from 'react';
import { createContext } from 'use-context-selector';
import { createUseContext } from '~/functions/createUseContext';
import { events } from '~/services/events';
import { Task } from '~/core/types';
import { store } from '~/services/store';

const useProviderValues = () => {
  const [tasks, _setTasks] = useState<Task[]>();

  const setTasks = useCallback(async (tasks: Task[]) => {
    _setTasks(tasks);
    await store.setTasks(tasks);
  }, []);

  useEffect(() => {
    store.getTasks().then(_setTasks);

    return events.on('tasksUpdated', _setTasks);
  }, []);

  const addTask = useCallback(
    async (task: Task) => {
      const currentTasks = tasks ?? (await store.getTasks());

      await setTasks(currentTasks.concat(task));
    },
    [tasks, setTasks],
  );

  return {
    tasks,
    addTask,
  };
};

type TasksContextValues = ReturnType<typeof useProviderValues>;

const TasksContext = createContext({} as TasksContextValues);

export const useTasksContext = createUseContext(TasksContext);

export const TasksProvider = (props: { children: ReactNode }) => (
  <TasksContext.Provider value={useProviderValues()} {...props} />
);
