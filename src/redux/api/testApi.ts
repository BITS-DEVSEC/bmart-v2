import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const exampleApi = createApi({
  reducerPath: "exampleApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://api.example.com/" }),
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: () => "posts",
    }),
  }),
});

export const { useGetPostsQuery } = exampleApi;
