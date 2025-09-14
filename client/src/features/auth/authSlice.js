import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

export const signUp = createAsyncThunk('auth/signUp', async (userData) => {
    const response = await axios.post(`${API_URL}/auth/signup`, userData);
    return response.data;
});

export const login = createAsyncThunk('auth/login', async (userData) => {
    const response = await axios.post(`${API_URL}/auth/login`, userData);
    localStorage.setItem('token', response.data.session.access_token);
    return response.data;
});


const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        token: localStorage.getItem('token'),
        status: 'idle',
        error: null,
    },
    reducers: {
        logout: (state) => {
            state.user = null;
            state.token = null;
            localStorage.removeItem('token');
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(signUp.fulfilled, (state, action) => {
                // You might want to automatically log in the user or just signify success
            })
            .addCase(login.fulfilled, (state, action) => {
                state.user = action.payload.user;
                state.token = action.payload.session.access_token;
            });
    },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
