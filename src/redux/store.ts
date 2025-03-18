import { configureStore, combineReducers, AnyAction } from "@reduxjs/toolkit";
import { exampleApi } from "./api/testApi";
import { productsApi } from "./api/products";
import { requestsApi } from "./api/requests";
import { faydaApi } from "./api/fayda";
import { authApi } from "./api/auth";
import { virtualAccApi } from "./api/virtual_acc";
import { quotationApi } from "./api/quotations";
import userTypeReducer from "./state/userType";
import queryReducer from "./state/query";
import userReducer from "./state/user";
import counterReducer from "./state/counterSilce";

const combinedReducer = combineReducers({
  [exampleApi.reducerPath]: exampleApi.reducer,
  [requestsApi.reducerPath]: requestsApi.reducer,
  [productsApi.reducerPath]: productsApi.reducer,
  [faydaApi.reducerPath]: faydaApi.reducer,
  [authApi.reducerPath]: authApi.reducer,
  [virtualAccApi.reducerPath]: virtualAccApi.reducer,
  [quotationApi.reducerPath]: quotationApi.reducer,
  counter: counterReducer,
  userType: userTypeReducer,
  query: queryReducer,
  user: userReducer,
});

const rootReducer = (
  state: ReturnType<typeof combinedReducer> | undefined,
  action: AnyAction
): ReturnType<typeof combinedReducer> => {
  if (action.type === "RESET_STORE") {
    return combinedReducer(undefined, action);
  }
  return combinedReducer(state, action);
};

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      exampleApi.middleware,
      productsApi.middleware,
      requestsApi.middleware,
      faydaApi.middleware,
      authApi.middleware,
      virtualAccApi.middleware,
      quotationApi.middleware
    ),
});

export const resetReduxStore = (): void => {
  store.dispatch({ type: "RESET_STORE" });
  store.dispatch(exampleApi.util.resetApiState());
  store.dispatch(productsApi.util.resetApiState());
  store.dispatch(requestsApi.util.resetApiState());
  store.dispatch(faydaApi.util.resetApiState());
  store.dispatch(authApi.util.resetApiState());
  store.dispatch(virtualAccApi.util.resetApiState());
  store.dispatch(quotationApi.util.resetApiState());
};

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
