import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../actions/api";
import { useSelector } from "react-redux";

const initialState = {
  isLoggedIn: false,
  token: null,
};

export const loginReq = createAsyncThunk(
  "loginSlice/loginReq",
  async (loginData) => {
    const response = await api().post("v1/margaret/user/login", loginData);
    return response;
  }
);

export const loginSlice = createSlice({
  name: "loginSlice",
  initialState,
  reducers: {
    login: (state, action) => {
      (state.token = action.payload), (state.isLoggedIn = true);
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.token = null;
    },
  },
});

export const isLoggedIn = (state) => state.login.isLoggedIn;
export const { login, logout } = loginSlice.actions;
export default loginSlice.reducer;
