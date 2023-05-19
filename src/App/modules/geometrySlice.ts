import { createSlice } from '@reduxjs/toolkit';

export interface GeometryState {
    points: number[][];
}

const initialState: GeometryState = {
    points: [],
};

export const geometrySlice = createSlice({
    name: 'geometry',
    initialState: initialState,
    reducers: {
        clear: (state) => {
            state.points = [];
        },
        addPoint: (state, action) => {
            state.points = [...state.points, action.payload];
        },
        addPoints: (state, action) => {
            state.points = [...state.points, ...action.payload];
        },
    },
});

// Action creators are generated for each case reducer function
export const { clear, addPoint } = geometrySlice.actions;

export default geometrySlice.reducer;
