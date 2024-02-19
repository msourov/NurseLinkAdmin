import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "./features/authentication/loginSlice";

const store = configureStore({
  reducer: {
    login: loginSlice,
  },
});

export default store;
