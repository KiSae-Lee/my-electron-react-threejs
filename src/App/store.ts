import { configureStore } from '@reduxjs/toolkit';
import counterSlice from './modules/examples/counterSlice';
import geometrySlice from './modules/geometrySlice';
import csvDataSlice from './modules/csvDataSlice';

export const store = configureStore({
    reducer: { counterSlice, geometrySlice, csvDataSlice },
    devTools: true,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
});

export type RootState = ReturnType<typeof store.getState>;
