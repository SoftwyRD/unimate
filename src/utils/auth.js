
import axios from "axios";
import { API_BASE_URL } from "./config";


export const isAuthenticated = async (accessToken,refreshToken) => {
  
  if (!accessToken || !refreshToken) {
    console.log("Alguno de los tokens no existen");
    return false;
  }

  try {
    await axios.get(`${API_BASE_URL}/selections/`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return true;
  } catch (error) {
    console.log(error);

    if (error.response && error.response.status === 401) {
      try {
        const response = await axios.post(
          `${API_BASE_URL}/users/login/refresh`,
          {
            refresh: refreshToken,
          }
        );
        localStorage.setItem("accessToken", response.data.data.tokens.access);
        return true;
      } catch (error) {
        console.log(error);
        throw new Error("Error refreshing access token");
      }
    } else {
      throw new Error("Error checking authentication status");
    }
  }
};
