import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import gfatReducer from "./gfatSlice";

export const gfatStore = configureStore({
  reducer: {
    gfat: gfatReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
