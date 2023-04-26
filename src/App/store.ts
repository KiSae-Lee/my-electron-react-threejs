import { configureStore } from '@reduxjs/toolkit';
// import counterSlice from '../Redux Example/counterSlice';
import layerSlice from '../Action/LayerSlice';

export const store = configureStore({
    reducer: layerSlice,
});

export type RootState = ReturnType<typeof store.getState>;
