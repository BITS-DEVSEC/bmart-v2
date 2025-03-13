import { createSlice } from "@reduxjs/toolkit";

const userTypeSlice = createSlice({
  name: "userType",
  initialState: { value: "BUY" },
  reducers: {
    toBuy: (state) => {
      state.value = "BUY";
    },
    toSell: (state) => {
      state.value = "SELL";
    },
  },
});

export const { toBuy, toSell } = userTypeSlice.actions;
export default userTypeSlice.reducer;
