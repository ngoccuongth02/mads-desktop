import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { archiveService } from '@renderer/services/archive';

const initialState: any = {
    listArchive: [],
    metaPage: {},
    typePage: 'list',
    listQuestionArchive: [],
    currentQuestionNumber: 0,
    listDataMark: [],
    listDataAnswer: [],
};

export const fetchListArchive: any = createAsyncThunk('archive/fetchListArchive', async (data: any) => {
    return archiveService.getListArchive(data);
});

export const fetchQuestionArchive: any = createAsyncThunk('archive/fetchQuestionArchive', async () => {
    return archiveService.getQuestionArchive();
});

export const ArchiveSlice = createSlice({
    name: 'archive',
    initialState,
    reducers: {
        setTypePage: (state, action) => {
            state.typePage = action.payload;
        },
        setCurrentQuestionNumber: (state, action) => {
            state.currentQuestionNumber = action.payload;
        },
        setListDataMark: (state, action) => {
            state.listDataMark = action.payload;
        },
        setListDataAnswer: (state, action) => {
            state.listDataAnswer = action.payload;
        },
        resetArchive: (state) => {
            state.listArchive = [];
            state.metaPage = {};
            state.typePage = 'list';
            state.listQuestionArchive = [];
            state.currentQuestionNumber = 0;
            state.listDataMark = [];
            state.listDataAnswer = [];
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchListArchive.fulfilled, (state, action) => {
            state.listArchive = action.payload?.data?.storages || [];
            state.metaPage = action.payload?.data?.pagination || {};
        });
        builder.addCase(fetchQuestionArchive.fulfilled, (state, action) => {
            const _data = action.payload?.data?.storages || [];
            const _listDataMark = _data?.map((it: any, index: number) => {
                return {
                    id: it?.id,
                    isMark: false,
                    questionNumber: index,
                };
            });
            const _listDataAnswer = _data?.map((it: any) => {
                return {
                    answerText: '',
                    answers: [],
                    id: it?.id,
                    question: it?.question?.id,
                };
            });
            state.listQuestionArchive = _data || [];
            state.listDataMark = _listDataMark || [];
            state.listDataAnswer = _listDataAnswer || [];
        });
    },
});

export const archiveActions = { ...ArchiveSlice.actions };

export default ArchiveSlice.reducer;
