import axios from "axios";
import { updateAccessToken } from "./authSlice";
import { API_BASE_URL } from "./config";

export const isAuthenticated = async (dispatch) => {
  const accessToken = localStorage.getItem("accessToken");
  const refreshToken = getCookie("refreshToken");

  // Check if access token and refresh token exist
  if (!accessToken || !refreshToken) {
    return false;
  }

  try {
    const response = await axios.post(`${API_BASE_URL}/verifyToken`, {
      access: accessToken,
    });
    return true;
  } catch (error) {
    console.log(error);
    if (error.response && error.response.status === 401) {
      try {
        const response = await axios.post(`${API_BASE_URL}/refreshToken`, {
          access: accessToken,
          refresh: refreshToken,
        });
        localStorage.setItem("accessToken", response.data.data.tokens.access);
        dispatch(updateAccessToken({accessToken: response.data.data.tokens.access}))
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    }
    else { 
      alert("An error occurred processing the request. Please try again!")
    }
    return false;
  }
};

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const encodedName = encodeURIComponent(name);
  const parts = value.split(`; ${encodedName}=`);
  if (parts.length === 2) {
    const encodedValue = parts.pop().split(";").shift();
    const decodedValue = decodeURIComponent(encodedValue);
    return decodedValue;
  }
  return "";
}
