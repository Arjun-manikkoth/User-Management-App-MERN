import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AdminState {
  isLogged: boolean;
  email: string;
}

const initialState: AdminState = {
  isLogged: false,
  email: "",
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    setAdmin: (state, action: PayloadAction<AdminState>) => {
      state.isLogged = action.payload.isLogged;
      state.email = action.payload.email;
    },
    clearAdmin: (state) => {
      state.isLogged = false;
      state.email = "";
    },
  },
});

export const { setAdmin, clearAdmin } = adminSlice.actions;

export default adminSlice.reducer;
