import { createSlice } from '@reduxjs/toolkit';

interface LayerState {
    selectedLayer: string | null;
}

const initialState: LayerState = {
    selectedLayer: null,
};

export const layerSlice = createSlice({
    name: 'layer',
    initialState,
    reducers: {
        setLayerName: (state, action) => {
            state.selectedLayer = action.payload;
        },
    },
});

// Action creators are generated for each case reducer function
export const { setLayerName } = layerSlice.actions;

export default layerSlice.reducer;
