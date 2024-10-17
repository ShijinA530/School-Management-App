import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  students: [],
};

const studentSlice = createSlice({
  name: 'students',
  initialState,
    reducers: {
        setStudents: (state, action) => {
            state.students = action.payload;
          },
        addStudent: (state, action) => {
            state.students.push(action.payload);
        },
        updateStudent: (state, action) => {
            const index = state.students.findIndex(student => student._id === action.payload._id);
            if (index !== -1) {
                state.students[index] = action.payload;
            }
        },
        deleteStudent: (state, action) => {
            state.students = state.students.filter(student => student._id !== action.payload);
        }
    },
});

export const { addStudent, updateStudent, deleteStudent, setStudents } = studentSlice.actions;
export default studentSlice.reducer;
