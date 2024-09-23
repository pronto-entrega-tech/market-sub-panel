import { useCallback, useEffect, useState } from "react";
import { createContext } from "~/functions/createContext";
import { events } from "~/services/events";
import { Task } from "~/core/types";
import { store } from "~/services/store";

const useTasks = () => {
  const [tasks, _setTasks] = useState<Task[]>();

  const setTasks = useCallback(async (tasks: Task[]) => {
    _setTasks(tasks);
    await store.setTasks(tasks);
  }, []);

  useEffect(() => {
    store.getTasks().then(_setTasks);

    return events.on("tasksUpdated", _setTasks);
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

export const [TasksProvider, useTasksContext, useTasksContextSelector] =
  createContext(useTasks);
