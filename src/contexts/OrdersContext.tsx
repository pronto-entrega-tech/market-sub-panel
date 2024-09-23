import React, { useEffect, useState, ReactNode } from "react";
import { createContext } from "use-context-selector";
import { createUseContext } from "~/functions/createUseContext";
import { Order } from "~/core/types";
import { API_WS } from "~/constants/urls";
import { useMyContext } from "~/core/context";
import { accessToken } from "~/core/accessToken";
import { io } from "socket.io-client";
import { notifyMsg } from "~/constants/notifyMessages";
import { transformOrder } from "~/functions/transform";
import { useNotifsContext } from "./NotifsContext";

const useProviderValues = () => {
  const { isAuthed } = useMyContext();
  const { addNotif } = useNotifsContext();
  const [hasError, setError] = useState(false);
  const [orders, setOrders] = useState<Map<string, Order>>();
  const [orderUpdates, setOrderUpdates] = useState<Partial<Order>[]>([]);

  useEffect(() => {
    if (!isAuthed) return;

    const socket = io(API_WS, {
      transports: ["websocket"],
      auth: { token: accessToken.current },
    });

    socket.on("exception", (...a) => {
      setError(true);
      console.error("WS Exception", ...a);
    });

    socket.on("orders", (...orderUpdates: Partial<Order>[]) => {
      if (!orderUpdates.length) return setOrders((v) => v ?? new Map());

      setOrderUpdates((v) => [...v, ...orderUpdates]);
    });
    socket.emit("active-orders");
  }, [isAuthed]);

  useEffect(() => {
    if (!orderUpdates.length) return;

    orderUpdates.forEach(async (newOrder) => {
      if (!newOrder.order_id) return;

      const newOrders = new Map(orders);

      const completedStatuses = ["COMPLETING", "COMPLETED"];
      const finishedStatuses = ["CANCELING", "CANCELED", ...completedStatuses];

      if (finishedStatuses.includes(newOrder.status ?? "")) {
        const id = newOrders.get(newOrder.order_id)?.market_order_id;
        if (id) {
          const msg = completedStatuses.includes(newOrder.status ?? "")
            ? notifyMsg.orderCompleted(id)
            : notifyMsg.orderCanceled(id);

          addNotif(msg);

          newOrders.delete(newOrder.order_id);
        }
      } else {
        newOrders.set(newOrder.order_id, {
          ...(newOrders.get(newOrder.order_id) ?? {}),
          ...transformOrder(newOrder),
        });
      }
      return setOrders(newOrders);
    });
    setOrderUpdates([]);
  }, [orderUpdates, orders, addNotif]);

  return {
    orders,
    hasError,
  };
};

type OrdersContextValues = ReturnType<typeof useProviderValues>;

const OrdersContext = createContext({} as OrdersContextValues);

export const useOrdersContext = createUseContext(OrdersContext);

export const OrdersProvider = (props: { children: ReactNode }) => (
  <OrdersContext.Provider value={useProviderValues()} {...props} />
);
