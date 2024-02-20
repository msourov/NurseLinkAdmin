import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../actions/api";
import { useSelector } from "react-redux";

const initialState = {
  status: "idle",
  isLoggedIn: false,
  token: null,
};

export const loginReq = createAsyncThunk(
  "loginSlice/loginReq",
  async ({ user_id, password }) => {
    try {
      const response = await api().post("v1/margaret/user/login", {
        email: user_id,
        password: password,
      });
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);

export const loginSlice = createSlice({
  name: "loginSlice",
  initialState,
  reducers: {
    // login: (state, action) => {
    //   (state.token = action.payload), (state.isLoggedIn = true);
    // },
    logout: (state) => {
      localStorage.clear();
      state.isLoggedIn = false;
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginReq.pending, (state) => {
        state.status = "loading";
      }) // Put void () or {} in arrow function. Because () returns a value which cause error with using immer but {} doesn't return anything
      .addCase(loginReq.fulfilled, (state, action) => {
        state.status = "idle";
        state.token = action.payload.access_token;
        state.isLoggedIn = true;
        // dispatch(navigate("/dashboard"));
      })
      .addCase(loginReq.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message;
      });
  },
});

export const isLoggedIn = (state) => state.login.isLoggedIn;
export const { logout } = loginSlice.actions;
export default loginSlice.reducer;
