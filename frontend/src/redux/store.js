import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/authSlice'; 
import studentReducer from './features/studentSlice';
import libraryReducer from './features/librarySlice';
import feesReducer from './features/feesSlice';
import staffReducer from './features/staffSlice'

const store = configureStore({
  reducer: {
    userAuth: authReducer,    // Authentication state
    students: studentReducer, // Student state management
    library: libraryReducer,  // Library records state management
    fees: feesReducer,        // Fees records state management
    staffs: staffReducer      // Staff accounts state management
  }
});

export default store;
