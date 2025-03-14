import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./baseUrl";

export const virtualAccApi = createApi({
  reducerPath: "virtualAccApi",
  baseQuery: baseQuery,
  tagTypes: ["virtual-accounts"],
  endpoints: (builder) => ({
    createVirtualAcc: builder.mutation({
      query: (data) => ({
        url: "/virtual_accounts",
        body: { payload: data },
        method: "POST",
      }),
      invalidatesTags: ["virtual-accounts"],
    }),
  }),
});

export const { useCreateVirtualAccMutation } = virtualAccApi;
