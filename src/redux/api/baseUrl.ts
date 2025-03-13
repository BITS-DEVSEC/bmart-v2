import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getCookie } from "@/utils/cookieManager";

const token = async () => {
  const res = await getCookie({ key: "token" });

  return res?.value;
};

export const baseQuery = fetchBaseQuery({
  baseUrl: "https://snf.bitscollege.edu.et/snf_wholesaler/",
  prepareHeaders: async (headers) => {
    const tokenValue = await token();
    if (tokenValue) {
      headers.set("Authorization", `Bearer ${tokenValue}`);
    }
    return headers;
  },
});

export const baseQueryFayda = fetchBaseQuery({
  baseUrl: "https://67d2458a90e0670699bcdd19.mockapi.io/",
});
