// counterReducer.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: false,
};

export const userLogin= createSlice({
  name: 'ad',
  initialState,
  reducers: {
    login: (state) => {
      state.value = true;
    },
    notLogin: (state) => {
      state.value = false;
    },
  },
});

export const { login, notLogin } = userLogin.actions;

export default userLogin.reducer;
