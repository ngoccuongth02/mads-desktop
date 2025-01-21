import { createSlice } from '@reduxjs/toolkit';

const initialState: any = {
    user: null,
};

export const AuthSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state: any, action: any) => {
            state.user = action.payload;
        },
        logout: (state: any) => {
            state.user = null;
        },
    },
});

export const authActions = { ...AuthSlice.actions };

export default AuthSlice.reducer;
