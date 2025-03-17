import { createSlice } from "@reduxjs/toolkit";

const querySlice = createSlice({
  name: "query",
  initialState: { value: { search: "", category: "" } },
  reducers: {
    setSearch: (state, action) => {
      state.value.search = action.payload;
    },
    setCategory: (state, action) => {
      state.value.category = action.payload;
    },
  },
});

export const { setSearch, setCategory } = querySlice.actions;
export default querySlice.reducer;
