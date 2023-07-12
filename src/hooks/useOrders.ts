import useSWR, { SWRResponse } from 'swr';
import { Order } from '~/core/types';
import { transformOrder } from '~/functions/transform';

const withTransform = <T extends SWRResponse>(
  swr: T,
  transform: (v: any) => any,
) => {
  return swr.data
    ? {
        ...swr,
        data: Array.isArray(swr.data)
          ? swr.data.map(transform)
          : transform(swr.data),
      }
    : swr;
};

export const useOrders = () =>
  withTransform(useSWR<Order[]>('/orders'), transformOrder);
