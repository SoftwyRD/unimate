import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_BASE_URL } from "../utils/config";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false,
    user: null,
    accessToken: null,
    refreshToken: null,
  },
  reducers: {
    loginSuccess: (state, action) => {
      const { access, refresh, user } = action.payload;
      state.isLoggedIn = true;
      state.user = user;
      state.accessToken = access;
      state.refreshToken = refresh;
    },
    logoutSuccess: (state) => {
      state.isLoggedIn = false;
      state.user = null;
      state.accessToken = null;
      // remove the refresh token when logging out
      state.refreshToken = null;
    },
  },
});

export const { loginSuccess, logoutSuccess } = authSlice.actions;

// async action creator to handle login
export const login = (credentials) => async (dispatch) => {
  try {
    const response = await axios.post(`${API_BASE_URL}users/login/`, credentials);
    const {data: {data : { tokens:  {access, refresh }}}} = response;
    console.log(access)
    console.log(refresh)
     // set access token in local storage
    localStorage.setItem("accessToken", access);

    // set refresh token in http only cookie
    document.cookie = `refreshToken=${refresh}; Secure; HttpOnly; SameSite=Strict`;

    dispatch(loginSuccess( access, refresh, credentials.username ));

    alert("Todo funciono bien !")
  } catch (error) {
    console.log(error);
  }
};

// async action creator to handle logout
export const logout = () => async (dispatch) => {
  try {
    // remove access token from local storage
    localStorage.removeItem("accessToken"); // remove refresh token from http only cookie
    document.cookie =
      "refreshToken=; Secure; HttpOnly; SameSite=Strict; Expires=Thu, 01 Jan 1970 00:00:00 GMT";

    dispatch(logoutSuccess());
  } catch (error) {
    console.log(error);
  }
};

export default authSlice.reducer;
