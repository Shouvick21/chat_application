import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
// import {createFilter} from "redux-persist-transform-filter"
import userreducer from "../features/user/userSlice";
import messagereducer from "../features/homepage/homepageSlice";
import socketreducer from "../features/socket/socketSlice";

// const userFilter=createFilter("usersdata",null,["flag"])
const persistConfig = {
  key: "root",
  version: 1,
  storage,

  // transforms: [userFilter]

  // blacklist state will not persist
  // blacklist:["usersdata.flag","messagedata.componentRender"]
};
const rootReducer = combineReducers({
  usersdata: userreducer,
  messagedata: messagereducer,
  socket: socketreducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
