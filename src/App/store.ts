import { configureStore } from '@reduxjs/toolkit';
import counterSlice from './assets/examples/counterSlice';

export const store = configureStore({
    reducer: { counterSlice },
});

export type RootState = ReturnType<typeof store.getState>;
