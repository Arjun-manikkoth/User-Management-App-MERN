import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AdminState {
  isLogged: boolean;
  email: string;
  token: string;
}

const initialState: AdminState = {
  isLogged: false,
  email: "",
  token: "",
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    setAdmin: (state, action: PayloadAction<AdminState>) => {
      state.isLogged = action.payload.isLogged;
      state.email = action.payload.email;
      state.token = action.payload.token;
    },
    clearAdmin: (state) => {
      state.isLogged = false;
      state.email = "";
      state.token = "";
    },
  },
});

export const { setAdmin, clearAdmin } = adminSlice.actions;

export default adminSlice.reducer;
