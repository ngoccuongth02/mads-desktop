import { createSlice } from '@reduxjs/toolkit';
import { ELanguages } from '@renderer/constants/i18n';
import { Paths } from '@renderer/constants/paths';
import { setLanguage } from '@renderer/languages';

const initialState: any = {
    path: Paths.HOME,
    lang: ELanguages.VI,
};

export const RouterSlice = createSlice({
    name: 'router',
    initialState,
    reducers: {
        changePath: (state: any, action: any) => {
            state.path = action.payload;
            localStorage.setItem('path', action.payload);
        },
        changeLang: (state: any, action: any) => {
            state.lang = action.payload;
            setLanguage(action.payload);
        },
    },
});

export const routerActions = { ...RouterSlice.actions };

export default RouterSlice.reducer;
