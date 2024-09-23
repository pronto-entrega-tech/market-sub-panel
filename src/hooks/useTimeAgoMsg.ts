import { useEffect, useState } from "react";
import { createTimeAgo } from "~/functions/timeAgoMsg";

export const useTimeAgoMsg = (createdAt: Date) => {
  const [now, setNow] = useState(new Date());
  const [msg, setMsg] = useState(createTimeAgo(createdAt).msg);

  useEffect(() => {
    const { msg, timeUntilUpdate } = createTimeAgo(createdAt, now);
    setMsg(msg);

    if (!timeUntilUpdate) return;

    const timeout = setTimeout(() => setNow(new Date()), timeUntilUpdate);

    return () => clearTimeout(timeout);
  }, [now, createdAt]);

  return msg;
};
