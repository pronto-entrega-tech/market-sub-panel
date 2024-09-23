import { useCallback, useEffect, useState } from "react";
import { AlertState } from "~/components/MyAlert";
import { createContext } from "~/functions/createContext";
import { api } from "~/services/api";
import { Buffer } from "buffer";
import { second } from "~/constants/time";
import { events } from "~/services/events";
import { accessToken } from "./accessToken";
import { ToastState } from "~/components/MyToast";
import { useConnection } from "~/functions/connection";
import { fail } from "~/functions/fail";

const useCommon = () => {
  const hasConnection = useConnection() ?? true;
  const [statefulAccessToken, setStatefulAccessToken] =
    useState<typeof accessToken.current>();
  const [alertState, setAlertState] = useState<AlertState>();
  const [toastState, setToastState] = useState<ToastState>({ message: "" });

  const isAuthed =
    statefulAccessToken === undefined ? undefined : !!statefulAccessToken;

  const setAccessToken = useCallback((newToken: typeof accessToken.current) => {
    accessToken.innerSet(newToken);
    setStatefulAccessToken(newToken);
  }, []);

  useEffect(() => {
    if (!hasConnection) return;

    const revalidateToken = async () => {
      if (statefulAccessToken === null) return;

      try {
        const token = await api.auth.revalidate();
        setAccessToken(token);
      } catch {
        setAccessToken(null);
      }
    };

    if (!statefulAccessToken) {
      revalidateToken();
      return;
    }

    const [, encodedPayload] = statefulAccessToken.split(".");
    const payload = JSON.parse(
      Buffer.from(encodedPayload ?? fail(), "base64").toString(),
    );
    const timeLeft = payload.exp * second - Date.now();

    const revalidateTimeout = setTimeout(
      revalidateToken,
      timeLeft - 60 * second,
    );
    return () => clearTimeout(revalidateTimeout);
  }, [hasConnection, statefulAccessToken, setAccessToken]);

  useEffect(() => {
    return events.on("unauthorized", () => {
      setAccessToken(null);
    });
  }, [setAccessToken]);

  const signOut = useCallback(async () => {
    await api.auth.signOut();
    setAccessToken(null);
  }, [setAccessToken]);

  const alert = useCallback(
    (
      title: string,
      subtitle?: string,
      opts?: Omit<AlertState, "title" | "subtitle">,
    ) => setAlertState({ title, subtitle, ...opts } as AlertState),
    [],
  );

  const dismissAlert = () => {
    setAlertState(undefined);
  };

  const toast = (message: string, opts?: Omit<ToastState, "message">) => {
    setToastState({ message, ...opts });
  };

  return {
    alert,
    dismissAlert,
    alertState,
    toast,
    toastState,
    isAuthed,
    setAccessToken,
    signOut,
  };
};

export const [MyProvider, useMyContext, useMyContextSelector] =
  createContext(useCommon);
