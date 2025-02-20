import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { missionService } from '@renderer/services/mission';

const initialState: any = {
    listMission: [],
    listMissionByCalendar: [],
    listEventCalendar: [],
};

export const getListMission: any = createAsyncThunk('mission/getListMission', async (data: any) => {
    return missionService.getListMission(data);
});

export const getListMissionByCalendar: any = createAsyncThunk('mission/getListMissionByCalendar', async (data: any) => {
    return missionService.getListMission(data);
});

export const getDataEventCalendar: any = createAsyncThunk('mission/getDataEventCalendar', async (data: any) => {
    return missionService.getDataEventCalendar(data);
});

export const MissionSlice = createSlice({
    name: 'mission',
    initialState,
    reducers: {
        resetListMissionByCalendar: (state) => {
            state.listMissionByCalendar = [];
        },
        setListMission: (state, action) => {
            state.listMission = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getListMission.fulfilled, (state, action) => {
            state.listMission = action.payload?.data?.quizzes || [];
        });
        builder.addCase(getListMissionByCalendar.fulfilled, (state, action) => {
            state.listMissionByCalendar = action.payload?.data?.quizzes || [];
        });
        builder.addCase(getDataEventCalendar.fulfilled, (state, action) => {
            state.listEventCalendar = action.payload?.data || [];
        });
    },
});

export const missionActions = { ...MissionSlice.actions };

export default MissionSlice.reducer;
