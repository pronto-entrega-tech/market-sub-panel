import { formatDistanceToNowStrict } from "date-fns";
import { day, hour, minute, month, year } from "~/constants/time";

/**
 * @example 'há 1 hora', 'há 5 minutos', 'agora'
 */
export const createTimeAgo = (createdAt: Date, now = new Date()) => {
  const timeAgo = +now - +createdAt;

  const minutes = Math.trunc(timeAgo / minute);
  const hours = Math.trunc(timeAgo / hour);
  const days = Math.trunc(timeAgo / day);
  const months = Math.trunc(timeAgo / month);
  const years = Math.trunc(timeAgo / year);

  const msg = !minutes
    ? "agora"
    : formatDistanceToNowStrict(createdAt, {
        addSuffix: true,
        roundingMethod: "floor",
      });

  const timeUntilUpdate = (() => {
    const getTimeUntilNext = (unitInMs: number) => {
      const next = (Math.trunc(timeAgo / unitInMs) + 1) * unitInMs;
      return next - timeAgo;
    };

    if (years) return getTimeUntilNext(year);
    if (months) return getTimeUntilNext(month);
    if (days) return getTimeUntilNext(day);
    if (hours) return getTimeUntilNext(hour);
    return getTimeUntilNext(minute);
  })();

  return {
    msg,
    timeUntilUpdate: timeUntilUpdate < 5 * minute ? timeUntilUpdate : undefined,
  };
};
