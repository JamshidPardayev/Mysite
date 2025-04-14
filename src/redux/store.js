import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';

const user = localStorage.getItem('user');
const token = localStorage.getItem('token');

const preloadedState = {
  auth: {
    user: user ? JSON.parse(user) : null,
    token: token || null,
    isAuthenticated: !!token,
  },
};

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  preloadedState,
});

export default store;
