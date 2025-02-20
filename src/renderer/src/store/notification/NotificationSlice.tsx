import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { notificationService } from '@renderer/services/notification';

const initialState: any = {
    listNotification: [],
};

export const fetchListNotification = createAsyncThunk('notification/fetchListNotification', async (params?: any) => {
    return notificationService.getListNotification(params);
});

export const NotificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchListNotification.fulfilled, (state, action) => {
            state.listNotification = action.payload?.data?.notifications;
        });
    },
});

export const notificationActions = { ...NotificationSlice.actions };

export default NotificationSlice.reducer;
