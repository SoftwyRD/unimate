const ACCESS_TOKEN_KEY = 'access_token';
const REFRESH_TOKEN_KEY = 'refresh_token';

const setTokens = (accessToken, refreshToken) => {
  localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
  document.cookie = `refresh_token=${refreshToken}; HttpOnly`;
};

const getAccessToken = () => localStorage.getItem(ACCESS_TOKEN_KEY);
const getRefreshToken = () => document.cookie.replace(/(?:(?:^|.*;\s*)refresh_token\s*\=\s*([^;]*).*$)|^.*$/, "$1");

const clearTokens = () => {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  document.cookie = 'refresh_token=; HttpOnly; expires=Thu, 01 Jan 1970 00:00:00 UTC';
};

export { setTokens, getAccessToken, getRefreshToken, clearTokens };
