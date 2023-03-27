import axios from "axios";
import { API_BASE_URL } from "./config";
import { updateAccessToken } from "../store/authSlice";

export const isAuthenticated = async (accessToken, refreshToken, dispatch) => {
  if (!accessToken) {
    console.log("AccessToken don't Exist");
    return false;
  }

  try {
    await axios.get(`${API_BASE_URL}/selections/`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    console.log("Tokens exist and is valid! ")
    return true;
  } catch (error) {
    console.log(error);

    if (error.response && error.response.status === 401) {
      try {
        const response = await axios.post(`${API_BASE_URL}/users/login/refresh/`, {
          refresh: refreshToken,
        });
        console.log("I have to change your access token :(");
        const newAccessToken = response.data.data.token.access;
        localStorage.setItem("accessToken", newAccessToken);
        console.log("Your access token is: " + newAccessToken);
        dispatch(updateAccessToken(newAccessToken));
        return isAuthenticated(newAccessToken, refreshToken, dispatch);
      
      } catch (error) {
        console.log(error);
        throw new Error("Error refreshing access token");
      }
    } else {
      throw new Error("Error checking authentication status");
    }
  }
};
