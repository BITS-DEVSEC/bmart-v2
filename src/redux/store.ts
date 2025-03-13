import { configureStore } from "@reduxjs/toolkit";
import { exampleApi } from "./api/testApi";
import counterReducer from "./state/counterSilce";

export const store = configureStore({
  reducer: {
    [exampleApi.reducerPath]: exampleApi.reducer,
    counter: counterReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(exampleApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
