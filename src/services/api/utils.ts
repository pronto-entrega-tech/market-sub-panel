import axios, { AxiosError } from 'axios';
import { API } from '~/constants/urls';
import { events } from '~/services/events';
import { accessToken } from '~/core/accessToken';

const apiCall = axios.create({
  baseURL: API,
  transformRequest: [
    (data) => {
      if (data)
        Object.entries(data).forEach(([key, value]) => {
          if (value === '') delete data[key];
        });

      return data;
    },
    ...(axios.defaults.transformRequest as []),
  ],
});

const stringify = (v: any) => JSON.stringify(v, null, 2);
const format = (v: any) => {
  try {
    return v && stringify(JSON.parse(v));
  } catch {
    return 'ERROR';
  }
};

apiCall.interceptors.response.use(undefined, (err: AxiosError) => {
  if (err.response?.status === 401) {
    events.emit('unauthorized');
  }

  const errMsg = [
    `${err.message}: ${err.request._response}`,
    `${err.config?.method?.toUpperCase()} ${err.request._url}`,
    `Request ${format(err.config?.data)}`,
    `Response ${stringify(err.response?.data)}`,
  ].join('\n');
  console.error(errMsg);

  err.message = errMsg;
  return Promise.reject(err);
});

const authHeader = () => ({
  headers: { Authorization: `Bearer ${accessToken.current}` },
});

export const apiUtils = { apiCall, authHeader };
