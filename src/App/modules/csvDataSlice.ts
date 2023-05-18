import { createSlice } from '@reduxjs/toolkit';

export interface CsvState {
    points: string[][];
}

const initialState: CsvState = {
    points: [],
};

export const csvDataSlice = createSlice({
    name: 'csv-data',
    initialState: initialState,
    reducers: {
        clear: (state) => {
            state.points = [];
        },
        readPointData: (state, action) => {
            state.points = [...state.points, ...action.payload];
        },
    },
});

// Action creators are generated for each case reducer function
export const { clear, readPointData } = csvDataSlice.actions;

export default csvDataSlice.reducer;
