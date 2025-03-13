import { createSlice } from "@reduxjs/toolkit";

export interface UserState {
  createdAt: string;
  fullName: string;
  phoneNumber: string;
  dateOfBirth: string;
  gender: string;
  nationality: string;
  city: string;
  subcity: string;
  woreda: string;
  id: string;
  fayda: string;
}

const userSlice = createSlice({
  name: "user",
  initialState: {} as UserState,
  reducers: {
    setUser: (state, action) => {
      state.createdAt = action.payload.createdAt;
      state.fullName = action.payload.fullName;
      state.phoneNumber = action.payload.phoneNumber;
      state.dateOfBirth = action.payload.dateofbirth;
      state.gender = action.payload.gender;
      state.nationality = action.payload.nationality;
      state.city = action.payload.city;
      state.subcity = action.payload.subcity;
      state.woreda = action.payload.woreda;
      state.id = action.payload.id;
      state.fayda = action.payload.id;
    },
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
