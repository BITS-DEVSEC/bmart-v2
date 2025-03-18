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
        url: `/orders/${data?.quotation_id}/create_from_quotation`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["quotations"],
    }),
    myOrders: builder.query({
      query: () => ({
        url: "/orders/my_orders",
        method: "GET",
      }),
      providesTags: ["quotations"],
    }),
    myQuotations: builder.query({
      query: () => ({
        url: "/quotations/my_quotations",
        method: "GET",
      }),
      providesTags: ["quotations"],
    }),
  }),
});

export const {
  useGetQuotationsQuery,
  useCreateOrderMutation,
  useMyOrdersQuery,
  useMyQuotationsQuery,
} = quotationApi;
