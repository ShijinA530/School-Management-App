import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  feesRecords: [],
};

const feesSlice = createSlice({
  name: 'fees',
  initialState,
  reducers: {
    addFee: (state, action) => {
      state.feesRecords.push(action.payload);
    },
    updateFee: (state, action) => {
      const index = state.feesRecords.findIndex(fee => fee._id === action.payload._id);
      if (index !== -1) {
        state.feesRecords[index] = action.payload;
      }
    },
    deleteFee: (state, action) => {
      state.feesRecords = state.feesRecords.filter(fee => fee._id !== action.payload);
    },
    setFees: (state, action) => {
      state.feesRecords = action.payload;
    },
  },
});

export const { addFee, updateFee, deleteFee, setFees } = feesSlice.actions;
export default feesSlice.reducer;
