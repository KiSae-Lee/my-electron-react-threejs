import { configureStore } from '@reduxjs/toolkit';
// import counterSlice from '../Redux Example/counterSlice';
import layerSlice from '../Action/LayerSlice';
import tableSlice from '../Action/TableSlice';

export const store = configureStore({
    reducer: { layerSlice, tableSlice },
});

export type RootState = ReturnType<typeof store.getState>;
