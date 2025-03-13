import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./baseUrl";

export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: baseQuery,
  tagTypes: ["products-base", "products-unit"],
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => "/products",
      providesTags: ["products-base"],
    }),
    getProductCategories: builder.query({
      query: () => "/categories",
    }),
  }),
});

export const { useGetProductsQuery, useGetProductCategoriesQuery } =
  productsApi;
