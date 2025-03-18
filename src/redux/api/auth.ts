import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./baseUrl";

export type UserRegisterPayload = {
  user: {
    first_name: string;
    middle_name: string;
    last_name: string;
    phone_number: string;
    password: string;
    business_name: string;
    tin_number: string;
    business_type: string;
    date_of_birth: string;
    gender: string;
    nationality: string;
    occupation: string;
    source_of_funds: string;
    kyc_status?: string;
    fayda_id: string;
  };
  address: {
    address_type: string;
    city: string;
    sub_city: string;
    woreda: string;
    latitude: number;
    longitude: number;
  };
};

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: baseQuery,
  tagTypes: ["auth-base"],
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (payload: { data: UserRegisterPayload }) => ({
        url: "/auth/signup",
        body: payload.data,
        method: "POST",
      }),
      invalidatesTags: ["auth-base"],
    }),
    login: builder.mutation({
      query: (payload: {
        data: { phone_number: string; password: string };
      }) => ({
        url: "/auth/login",
        body: payload.data,
        method: "POST",
      }),
      invalidatesTags: ["auth-base"],
    }),
    profile: builder.query({
      query: () => ({
        url: "/users/profile",
        method: "GET",
      }),
      providesTags: ["auth-base"],
    }),
  }),
});

export const { useRegisterMutation, useLoginMutation, useProfileQuery } = authApi;
