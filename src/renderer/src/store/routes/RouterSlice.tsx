import { createSlice } from '@reduxjs/toolkit';
import { Paths } from '@renderer/constants/paths';

const initialState: any = {
    path: Paths.HOME,
};

export const RouterSlice = createSlice({
    name: 'router',
    initialState,
    reducers: {
        changePath: (state: any, action: any) => {
            state.path = action.payload;
        },
    },
});

export const routerActions = { ...RouterSlice.actions };

export default RouterSlice.reducer;
