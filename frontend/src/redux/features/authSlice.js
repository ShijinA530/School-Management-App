import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userInfo: JSON.parse(localStorage.getItem('userInfo'))
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action) => {
            localStorage.setItem('userInfo', JSON.stringify(action.payload))
            state.userInfo = action.payload
        },
        logout: (state) => {
            localStorage.removeItem('userInfo')
            state.userInfo = null
        }
    }
})

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;