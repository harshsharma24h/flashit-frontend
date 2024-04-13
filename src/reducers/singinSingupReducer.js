import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: '',
};

export const showNotShow = createSlice({
  name: 'YesNo',
  initialState,
  reducers: {
    YesTrue: (state) => {
      state.value = false;
    },
    NoFalse: (state) => {
      state.value = true;
    },
  },
});

export const { YesTrue, NoFalse } = showNotShow.actions;

export default showNotShow.reducer;
