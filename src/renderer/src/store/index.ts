import { configureStore } from '@reduxjs/toolkit';
import AuthReducer from './auth/AuthSlice';
import RouterReducer from './routes/RouterSlice';

export const store = configureStore({
    reducer: {
        router: RouterReducer,
        auth: AuthReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
});
