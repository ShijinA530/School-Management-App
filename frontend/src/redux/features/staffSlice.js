import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  staffList: [], 
};

const staffSlice = createSlice({
  name: 'library',
  initialState,
  reducers: {
    addStaff: (state, action) => {
      state.staffList.push(action.payload);
    },
    updateStaff: (state, action) => {
      const index = state.staffList.findIndex(staff => staff._id === action.payload._id);
      if (index !== -1) {
        state.staffList[index] = action.payload;
      }
    },
    deleteStaff: (state, action) => {
      state.staffList = state.staffList.filter(staff => staff._id !== action.payload);
    },
    setStaffs: (state, action) => {
      state.staffList = action.payload; 
    },
  },
});

export const { addStaff, updateStaff, deleteStaff, setStaffs } = staffSlice.actions;
export default staffSlice.reducer;
