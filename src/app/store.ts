import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import imageGridReducer from '../features/imageGrid/imageGridSlice';

export const store = configureStore({
  reducer: {
    images:imageGridReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
