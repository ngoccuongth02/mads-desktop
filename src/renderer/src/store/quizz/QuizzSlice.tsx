import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { STORAGE } from '@renderer/constants/storage';
import { quizzService } from '@renderer/services/quizz';

const initialState: any = {
    dataQuizz: {},
    currentIDQuizz: '',
    listIDQuizz: [],
    dataSections: {},
    dataRenderQuestion: {},
    currentQuestionNumber: 0,
    listDataMark: [],
    dataCurrentSection: {},
    dataCurrentCourse: {},
    dataStartTime: {},
    indexSection: 0,
    listDataAnswer: [],
    currentIDSection: '',
    isCheckTime: true,
};

export const fetchDataQuizz = createAsyncThunk('quizz/fetchDataQuizz', async (params?: any) => {
    return quizzService.getDataQuizz(params);
});

export const fetchDataSections = createAsyncThunk('quizz/fetchDataSections', async (params?: any) => {
    return quizzService.getDataSections(params);
});

export const fetchStartTime = createAsyncThunk('quizz/fetchStartTime', async (id?: any) => {
    return quizzService.startTime(id);
});

export const QuizzSlice = createSlice({
    name: 'quizz',
    initialState,
    reducers: {
        setCurrentIDQuizz: (state, action) => {
            state.currentIDQuizz = action.payload;
        },
        setListIDQuizz: (state, action) => {
            state.listIDQuizz = action.payload;
        },
        setDataRenderQuestion: (state, action) => {
            state.dataRenderQuestion = action.payload;
        },
        setCurrentQuestionNumber: (state, action) => {
            state.currentQuestionNumber = action.payload;
            state.dataCurrentSection = state.dataRenderQuestion?.childSection?.[action.payload];
        },
        setListDataMark: (state, action) => {
            state.listDataMark = action.payload;
        },
        setDataCurrentCourse: (state, action) => {
            state.dataCurrentCourse = action.payload;
        },
        setIdStartTest: (state, action) => {
            state.idStartTest = action.payload;
        },
        setIndexSection: (state, action) => {
            state.indexSection = action.payload;
        },
        setListDataAnswer: (state, action) => {
            state.listDataAnswer = action.payload;
        },
        setCurrentIDSection: (state, action) => {
            state.currentIDSection = action.payload;
            localStorage.setItem(STORAGE.currentIDSection, action.payload);
        },
        setDataSection: (state, action) => {
            state.dataSections = action.payload;
        },
        setIsCheckTime: (state, action) => {
            state.isCheckTime = action.payload;
        },
        resetDataQuizz: (state) => {
            state.dataQuizz = {};
            state.currentIDQuizz = '';
            state.listIDQuizz = [];
            state.dataSections = {};
            state.dataRenderQuestion = {};
            state.currentQuestionNumber = 0;
            state.listDataMark = [];
            state.dataCurrentSection = {};
            state.dataCurrentCourse = {};
            state.dataStartTime = {};
            state.indexSection = 0;
            state.listDataAnswer = [];
            state.currentIDSection = '';
            state.isCheckTime = true;
        },
        resetDataQuizzLocalStorage: () => {
            localStorage.removeItem(STORAGE.indexSection);
            localStorage.removeItem(STORAGE.currentIDQuizz);
            localStorage.removeItem(STORAGE.currentIDSection);
            localStorage.removeItem(STORAGE.listIDQuizz);
            localStorage.removeItem(STORAGE.dataCurrentCourse);
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchDataQuizz.fulfilled, (state, action) => {
            state.dataQuizz = action.payload?.data?.quizzes;
        });
        builder.addCase(fetchDataSections.fulfilled, (state, action) => {
            state.dataSections = action.payload?.data;
        });
        builder.addCase(fetchStartTime.fulfilled, (state, action) => {
            state.dataStartTime = action.payload?.data;
        });
    },
});

export const quizzActions = { ...QuizzSlice.actions };

export default QuizzSlice.reducer;
