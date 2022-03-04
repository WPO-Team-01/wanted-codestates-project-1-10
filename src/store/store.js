import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { ContentsApi } from "./query/ContentsApi";

export const store = configureStore({
  reducer: {
    [ContentsApi.reducerPath]: ContentsApi.reducer,
  },
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(ContentsApi.middleware),
});

setupListeners(store.dispatch);
