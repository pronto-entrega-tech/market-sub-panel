import { isPast } from "date-fns";
import { myColors } from "~/constants/myColors";
import { Order } from "~/core/types";

export const getStatusName = (
  order: Pick<Order, "status" | "delivery_max_time">,
) =>
  isOrderLate(order)
    ? "Atrasado"
    : ({
        APPROVAL_PENDING: "Pendente",
        PROCESSING: "Em preparo",
        DELIVERY_PENDING: "Saiu",
        COMPLETING: "Concluindo",
        COMPLETED: "Concluído",
        CANCELING: "Cancelando",
        CANCELED: "Cancelado",
      }[order.status as string] ?? "");

export const getStatusColor = (
  order: Pick<Order, "status" | "delivery_max_time">,
) =>
  isOrderLate(order)
    ? myColors.red
    : ({
        APPROVAL_PENDING: myColors.green,
        PROCESSING: myColors.yellow,
        DELIVERY_PENDING: myColors.primaryColor,
        COMPLETING: "lightgrey",
        COMPLETED: "lightgrey",
        CANCELING: "lightgrey",
        CANCELED: "lightgrey",
      }[order.status as string] ?? "");

export const isOrderLate = (order: Pick<Order, "delivery_max_time">) =>
  isPast(new Date(order.delivery_max_time));
