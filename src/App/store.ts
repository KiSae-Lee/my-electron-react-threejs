import { configureStore } from '@reduxjs/toolkit';
import counterSlice from './modules/examples/counterSlice';
import geometrySlice from './modules/geometrySlice';

export const store = configureStore({
    reducer: { counterSlice, geometrySlice },
});

export type RootState = ReturnType<typeof store.getState>;
