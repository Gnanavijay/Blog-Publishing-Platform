import { configureStore } from '@reduxjs/toolkit';
import postReducer from './features/posts/postSlice';
import authReducer from './features/auth/authSlice';

export default configureStore({
    reducer: {
        posts: postReducer,
        auth: authReducer,
    },
});
