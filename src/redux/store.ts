import { configureStore } from "@reduxjs/toolkit";
import { exampleApi } from "./api/testApi";
import { productsApi } from "./api/products";
import { requestsApi } from "./api/requests";
import { faydaApi } from "./api/fayda";
import { authApi } from "./api/auth";
import { virtualAccApi } from "./api/virtual_acc";
import userTypeReducer from "./state/userType";
import userReducer from "./state/user";
import counterReducer from "./state/counterSilce";

export const store = configureStore({
  reducer: {
    [exampleApi.reducerPath]: exampleApi.reducer,
    [requestsApi.reducerPath]: requestsApi.reducer,
    [productsApi.reducerPath]: productsApi.reducer,
    [faydaApi.reducerPath]: faydaApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [virtualAccApi.reducerPath]: virtualAccApi.reducer,
    counter: counterReducer,
    userType: userTypeReducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      exampleApi.middleware,
      productsApi.middleware,
      requestsApi.middleware,
      faydaApi.middleware,
      authApi.middleware,
      virtualAccApi.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
