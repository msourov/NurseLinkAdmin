import { combineReducers, configureStore } from "@reduxjs/toolkit";
import loginSlice from "./features/authentication/loginSlice";
import storage from "redux-persist/lib/storage";
import persistReducer from "redux-persist/es/persistReducer";
import { persistStore } from "redux-persist";
import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import floorSlice from "./features/floorSlice";
import wardSlice from "./features/wardSlice";

const persistConfig = {
  key: "root",
  storage,
  // blacklist: ["", "", ] use blacklist for slices you don't want to persist
  whitelist: ["login", "floor", "ward"],
};

const rootReducer = combineReducers({
  login: loginSlice,
  floor: floorSlice,
  ward: wardSlice,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

const persistor = persistStore(store);

export { store, persistor };
