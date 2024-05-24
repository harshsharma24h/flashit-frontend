// filteredDataReducer.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  filteredData: [],
};

export const filteredDataSlice = createSlice({
  name: 'filteredData',
  initialState,
  reducers: {
    setFilteredData: (state, action) => {
      state.filteredData = action.payload;
    },
    clearFilteredData: (state) => {
      state.filteredData = [];
    },
    addFilteredData: (state, action) => {
      state.filteredData.push(action.payload);
    },
  },
});

export const { setFilteredData, clearFilteredData, addFilteredData } = filteredDataSlice.actions;

export default filteredDataSlice.reducer;
