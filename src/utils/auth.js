const ACCESS_TOKEN_KEY = "accessToken";
const REFRESH_TOKEN_KEY = "refreshToken";

const tokenUtils = {
  getAccessToken: () => localStorage.getItem(ACCESS_TOKEN_KEY),

  getRefreshToken: () => {
    const refreshTokenCookie = document.cookie.split(";").find(c => c.trim().startsWith(REFRESH_TOKEN_KEY));
    if (!refreshTokenCookie) return null;
    return refreshTokenCookie.split("=")[1];
  },

  clearTokens: () => {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    document.cookie = `${REFRESH_TOKEN_KEY}=; HttpOnly; expires=Thu, 01 Jan 1970 00:00:00 UTC`;
  },
};

export default tokenUtils;
