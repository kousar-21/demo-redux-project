// src/redux/userSlice.js
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  userName: '',
  userEmail: '',
  isLoggedIn: false,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.userName = action.payload.userName
      state.userEmail = action.payload.userEmail
      state.isLoggedIn = true
    },
    logout: (state) => {
      state.userName = ''
      state.userEmail = ''
      state.isLoggedIn = false
    },
  },
})

export const { setUser, logout } = userSlice.actions
export default userSlice.reducer
