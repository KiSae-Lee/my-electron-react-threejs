import { createSlice } from '@reduxjs/toolkit';

interface TableState {
    selectedFields: string[][] | null;
}

const initialState: TableState = {
    selectedFields: null,
};

export const tableSlice = createSlice({
    name: 'table',
    initialState,
    reducers: {
        updateFields: (state, action) => {
            state.selectedFields = action.payload.fields;
        },
    },
});

// Action creators are generated for each case reducer function
export const { updateFields } = tableSlice.actions;

export default tableSlice.reducer;
