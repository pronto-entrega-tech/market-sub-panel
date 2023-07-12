const useDevApi = process.env.USE_DEV_API === 'true';
const LOCAL_IP = process.env.LOCAL_IP;

const PROD_API = 'https://api.prontoentrega.com.br';
const DEV_API = `http://${LOCAL_IP ?? 'localhost'}:3000`;

const DEV_STATIC = `${DEV_API}/static`;
const PROD_STATIC = 'https://static.prontoentrega.com.br';

export const API = useDevApi /* && __DEV__ */ ? DEV_API : PROD_API;

export const API_WS = API.replace('3000', '3002');

export const STATIC = useDevApi /* && __DEV__ */ ? DEV_STATIC : PROD_STATIC;
