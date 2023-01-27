import { configureStore } from '@reduxjs/toolkit';
import { simulationSlice } from '@/features/simulation';

export const store = configureStore({
  reducer: {
    simulation: simulationSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
