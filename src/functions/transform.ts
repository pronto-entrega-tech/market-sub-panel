import { Notif, Order, Product } from "~/core/types";
import { cleanString } from "./cleanString";

const toDate = (v: any) => v && new Date(v);

const filterUndefined = (o: any) => {
  Object.entries(o).forEach(([k, v]) => {
    if (v === undefined) delete o[k];
  });
  return o;
};

export const transformOrder = ({
  customer,
  created_at,
  finished_at,
  delivery_max_time,
  delivery_min_time,
  items,
  ...rest
}: any) =>
  filterUndefined({
    ...rest,
    customer_name: customer?.name,
    created_at: toDate(created_at),
    finished_at: toDate(finished_at),
    delivery_max_time: toDate(delivery_max_time),
    delivery_min_time: toDate(delivery_min_time),
    items: items?.map(transformProduct),
  }) as Order;

export const transformProduct = ({ product, ...rest }: any) =>
  filterUndefined({
    ...rest,
    description:
      product &&
      cleanString(`${product.name} ${product.brand} ${product.quantity}`),
  }) as Product;

export const transformNotif = ({ created_at, ...rest }: any) =>
  filterUndefined({
    ...rest,
    created_at: toDate(created_at),
  }) as Notif;
