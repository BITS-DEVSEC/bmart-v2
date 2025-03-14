import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./baseUrl";

export const quotationApi = createApi({
  reducerPath: "quotationApi",
  baseQuery: baseQuery,
  tagTypes: ["quotations"],
  endpoints: (builder) => ({
    getQuotations: builder.query({
      query: () => ({
        url: "/quotations",
        method: "GET",
      }),
      providesTags: ["quotations"],
    }),
    createOrder: builder.mutation({
      query: (data) => ({
        url: `/orders/${1}/create_from_quotation`,
        method: "POST",
        body: { data },
      }),
      invalidatesTags: ["quotations"],
    }),
  }),
});

export const { useGetQuotationsQuery, useCreateOrderMutation } = quotationApi;
