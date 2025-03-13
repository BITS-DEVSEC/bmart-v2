import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryFayda } from "./baseUrl";

export const faydaApi = createApi({
  reducerPath: "faydaApi",
  baseQuery: baseQueryFayda,
  tagTypes: ["fayda-base", "fayda-unit"],
  endpoints: (builder) => ({
    getFaydaById: builder.query({
      query: (faydaId: string) => `/get_user/${faydaId}`,
    }),
  }),
});

export const { useLazyGetFaydaByIdQuery } = faydaApi;
