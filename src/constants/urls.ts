import Constants from "expo-constants";

const lanIp = Constants.expoConfig?.extra?.lanIp;

const PROD_API = "https://api.prontoentrega.com.br";
const DEV_API = `http://${lanIp}:3000`;

const DEV_STATIC = `${DEV_API}/static`;
const PROD_STATIC = "https://static.prontoentrega.com.br";

export const API = lanIp ? DEV_API : PROD_API;

export const API_WS = API.replace("3000", "3002");

export const STATIC = lanIp ? DEV_STATIC : PROD_STATIC;
