// src/redux/rootReducer.js
import { combineReducers } from '@reduxjs/toolkit'
import userReducer from './userSlice' // you will create this next

const rootReducer = combineReducers({
  user: userReducer,
})

export default rootReducer
