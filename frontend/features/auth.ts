import { User } from './../models/index';
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface AuthState {
  user: User;
}

const initialState: AuthState = {
  user: {
    uid: '',
    email: '',
    displayName: '',
    photoURL: '',
    auth: () => {},
  },
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<User>) {
      state.user = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const authActions = authSlice.actions;

export const authReducer = authSlice.reducer;
