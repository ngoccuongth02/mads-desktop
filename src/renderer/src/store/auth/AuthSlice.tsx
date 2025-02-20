import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { authService } from '@renderer/services/auth';
import { localToken } from '@renderer/utils/token';

export enum TYPE_USER {
    PARENT = 'parent',
    CHILD = 'child',
}

const initialState: any = {
    user: null,
    typeUser: TYPE_USER.CHILD,
    listDataLeaderboard: [],
    dataLeaderboardUser: {},
};

export const handleLogin: any = createAsyncThunk('auth/login', async (data: any) => {
    return authService.login(data);
});

export const handleGetDataRanking: any = createAsyncThunk('auth/getDataRanking', async (data: any) => {
    return authService.getDataRanking(data);
});

export const handleGetProfile: any = createAsyncThunk('auth/getProfile', async () => {
    return authService.getProfile();
});

export const fetchListDataLeaderboard: any = createAsyncThunk('auth/fetchListDataLeaderboard', async (data: any) => {
    return authService.getListDataLeaderboard(data);
});

export const AuthSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state: any) => {
            state.user = null;
            localStorage.removeItem('user');
            localToken.remove();
        },
        setTypeUser: (state: any, action: any) => {
            localStorage.setItem('typeUser', action.payload);
            state.typeUser = action.payload;
        },
        setUser: (state: any, action: any) => {
            state.user = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(handleLogin.fulfilled, (state, action) => {
            state.user = action.payload?.data?.data;
            localStorage.setItem('user', JSON.stringify(action?.payload?.data?.data));
        });
        builder.addCase(handleGetDataRanking.fulfilled, (state, action) => {
            state.dataRanking = action.payload?.data;
        });
        builder.addCase(handleGetProfile.fulfilled, (state, action) => {
            state.user = action.payload?.data;
        });
        builder.addCase(fetchListDataLeaderboard.fulfilled, (state, action) => {
            state.listDataLeaderboard = action.payload?.data?.leaderBoard;
            state.dataLeaderboardUser = action.payload?.data?.me;
        });
    },
});

export const authActions = { ...AuthSlice.actions };

export default AuthSlice.reducer;
