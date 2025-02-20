import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { homeService } from '@renderer/services/home';

const initialState: any = {
    listDataBanner: [],
    listSubject: [],
    listSubjectDetail: [],
    listQuizz: [],
    listMyCourse: [],
};

export const getListDataBanner: any = createAsyncThunk('home/getListDataBanner', async () => {
    return homeService.getListDataBanner();
});

export const getListSubject: any = createAsyncThunk('home/getListSubject', async () => {
    return homeService.getListSubject();
});

export const getSubjectDetail: any = createAsyncThunk('home/getSubjectDetail', async (id: string) => {
    return homeService.getSubjectDetail(id);
});

export const getListQuizz: any = createAsyncThunk('home/getListQuizz', async (id: string) => {
    return homeService.getListQuizz(id);
});

export const getDataMyCourse: any = createAsyncThunk('home/getDataMyCourse', async () => {
    return homeService.getDataMyCourse();
});

export const HomeSlice = createSlice({
    name: 'home',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getListDataBanner.fulfilled, (state, action) => {
            state.listDataBanner = action?.payload?.data?.banners || [];
        });
        builder.addCase(getListSubject.fulfilled, (state, action) => {
            state.listSubject = action?.payload?.data?.subjects || [];
        });
        builder.addCase(getSubjectDetail.fulfilled, (state, action) => {
            state.listSubjectDetail = action?.payload?.data?.subjects || [];
        });
        builder.addCase(getListQuizz.fulfilled, (state, action) => {
            state.listQuizz = action?.payload?.data?.quizzes || [];
        });
        builder.addCase(getDataMyCourse.fulfilled, (state, action) => {
            state.listMyCourse = action?.payload?.data?.subjects || [];
        });
    },
});

export const homeActions = { ...HomeSlice.actions };

export default HomeSlice.reducer;
