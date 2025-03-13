import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./baseUrl";

export const requestsApi = createApi({
  reducerPath: "requestsApi",
  baseQuery: baseQuery,
  tagTypes: ["requests-base", "requests-unit"],
  endpoints: (builder) => ({
    getRequests: builder.query({
      query: () => "/item_requests",
      providesTags: ["requests-base"],
    }),
    myRequests: builder.query({
      query: () => "/item_requests/my_requests",
      providesTags: ["requests-base"],
    }),
    createRequest: builder.mutation({
      query: (data) => ({
        url: "/item_requests",
        body: { payload: data },
        method: "POST",
      }),
      invalidatesTags: ["requests-base"],
    }),
  }),
});

export const {
  useGetRequestsQuery,
  useMyRequestsQuery,
  useCreateRequestMutation,
} = requestsApi;
