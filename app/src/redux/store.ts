import { configureStore } from "@reduxjs/toolkit";

import auth from "./slices/auth";
import profile from "./slices/profile";
import dialog from "./slices/dialog";

const store = configureStore({
  reducer: {
    auth,
    profile,
    dialog
  }
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;