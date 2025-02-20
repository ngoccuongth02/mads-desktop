import { createSlice } from '@reduxjs/toolkit';

const initialState: any = {
    dataBreadcrumb: [],
};

export const CourseSlice = createSlice({
    name: 'course',
    initialState,
    reducers: {
        setDataBreadcrumb: (state, action) => {
            if (action?.payload?.type == 'next') {
                const _data = [...state.dataBreadcrumb, action?.payload?.data];
                state.dataBreadcrumb = _data;
            } else {
                const _data = [...state.dataBreadcrumb];
                _data.pop();
                state.dataBreadcrumb = _data;
            }
        },
        resetDataBreadcrumb: (state) => {
            state.dataBreadcrumb = [];
        },
        setBreadcrumbByData: (state, action) => {
            state.dataBreadcrumb = action?.payload;
        },
    },
    extraReducers: () => {},
});

export const courseActions = { ...CourseSlice.actions };

export default CourseSlice.reducer;
