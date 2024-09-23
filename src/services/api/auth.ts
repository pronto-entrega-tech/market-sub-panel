import { withCache } from "../cache";
import { store } from "../store";
import { apiUtils } from "./utils";

const { apiCall } = apiUtils;

const role = "MARKET_SUB";

export const apiAuth = {
  connect: async (connect_token: string) => {
    const { data } = await apiCall.post<{
      access_token: string;
      refresh_token: string;
      expires_in: Date;
    }>("/auth/connect", {}, { headers: { connect_token } });

    await store.setRefreshToken(data.refresh_token);

    return data;
  },

  revalidate: async () => {
    const refreshToken = await store.getRefreshToken();
    if (!refreshToken) throw new Error("Missing refresh token");

    const { data } = await withCache(refreshToken, async () => {
      return apiCall.post<{
        access_token: string;
        refresh_token: string;
        expires_in: Date;
      }>("/auth/revalidate", { role }, { params: { refreshToken } });
    });

    await store.setRefreshToken(data.refresh_token);
    return data.access_token;
  },

  signOut: async () => {
    const refreshToken = await store.getRefreshToken();
    if (!refreshToken) throw new Error("Missing refresh token");

    await apiCall.post(
      "/auth/sign-out",
      { role },
      { params: { refreshToken } },
    );
  },
};
