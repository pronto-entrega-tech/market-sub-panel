import Events from "events";
import { Task } from "~/core/types";

type Event = {
  unauthorized: undefined;
  tasksUpdated: Task[];
};
type RemoveListener = () => void;

const _events = new Events();

export const events = {
  emit<T extends keyof Event>(
    ...[event, data]: Event[T] extends undefined
      ? [event: T]
      : [event: T, data: Event[T]]
  ) {
    _events.emit(event, data);
  },

  on<T extends keyof Event>(
    event: T,
    listener: (data: Event[T]) => void,
  ): RemoveListener {
    _events.on(event, listener);
    return () => {
      _events.off(event, listener);
    };
  },
};
