import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { myScoreService } from '@renderer/services/myScore';
const initialState: any = {
    listDataMyScore: [],
    metaPageMyScore: {},
};

export const fetchListDataMyScore = createAsyncThunk('myScore/fetchListDataMyScore', async (params?: any) => {
    return myScoreService.getListDataMyScore(params);
});

export const MyScoreSlice = createSlice({
    name: 'myScore',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchListDataMyScore.fulfilled, (state, action) => {
            state.listDataMyScore = (action.payload as any)?.data?.customerAnswer || [];
            state.metaPageMyScore = (action.payload as any)?.data?.pagination || {};
        });
    },
});

export const myScoreActions = { ...MyScoreSlice.actions };

export default MyScoreSlice.reducer;
