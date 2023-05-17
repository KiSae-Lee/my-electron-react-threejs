import { createSlice } from '@reduxjs/toolkit';

export interface GeometryState {
    points: Float32Array;
}

const initialState: GeometryState = {
    points: new Float32Array([]),
};

export const geometrySlice = createSlice({
    name: 'geometry',
    initialState: initialState,
    reducers: {
        clear: (state) => {
            state.points = new Float32Array([]);
        },
        addPoint: (state, action) => {
            state.points = action.payload;
        },
    },
});

// Action creators are generated for each case reducer function
export const { clear, addPoint } = geometrySlice.actions;

export default geometrySlice.reducer;
