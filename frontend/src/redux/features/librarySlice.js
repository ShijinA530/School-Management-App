import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  libraryRecords: [], 
};

const librarySlice = createSlice({
  name: 'library',
  initialState,
  reducers: {
    addRecord: (state, action) => {
      state.libraryRecords.push(action.payload);
    },
    updateRecord: (state, action) => {
      const index = state.libraryRecords.findIndex(record => record._id === action.payload._id);
      if (index !== -1) {
        state.libraryRecords[index] = action.payload;
      }
    },
    deleteRecord: (state, action) => {
      state.libraryRecords = state.libraryRecords.filter(record => record._id !== action.payload);
    },
    setRecords: (state, action) => {
      state.libraryRecords = action.payload; 
    },
  },
});

export const { addRecord, updateRecord, deleteRecord, setRecords } = librarySlice.actions;
export default librarySlice.reducer;
