import { apiUtils } from './utils';

const { apiCall, authHeader } = apiUtils;

export const apiOrders = {
  confirm: async (order_id: string, confirmation_token: string) => {
    await apiCall.patch(
      `/orders/market/${order_id}`,
      { action: 'COMPLETE', confirmation_token },
      authHeader(),
    );
  },
};
