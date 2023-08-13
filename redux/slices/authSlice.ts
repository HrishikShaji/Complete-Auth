"use client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface InitialState {
  id: string;
  authenticated: boolean;
}

const initialState: InitialState = {
  id: "",
  authenticated: false,
};

export const AuthSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    logIn: (state, action) => {
      return {
        id: action.payload.id,
        authenticated: true,
      };
    },
    logOut: () => {
      return initialState;
    },
  },
});

export const { logIn, logOut } = AuthSlice.actions;
export default AuthSlice.reducer;
