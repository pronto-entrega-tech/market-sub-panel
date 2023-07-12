let accessTokenValue: string | null | undefined;

export const accessToken = {
  get current() {
    return accessTokenValue;
  },
  /**
   * To be used by auth context.
   */
  innerSet: (newToken: typeof accessTokenValue) => {
    accessTokenValue = newToken;
  },
};
