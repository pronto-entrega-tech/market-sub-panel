import { apiAuth } from './auth';
import { apiOrders } from './orders';

/*
import OpenAPIClientAxios from 'openapi-client-axios';

export const api = new OpenAPIClientAxios({ definition: 'https://localhost:3000/openapi.json' });
api.init();
*/

export const api = {
  auth: apiAuth,
  orders: apiOrders,
};
