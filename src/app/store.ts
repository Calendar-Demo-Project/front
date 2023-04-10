import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import { smallCalendarReducer } from '../features/smallCalendar/smallCalendarSlice';

export const store = configureStore({
  reducer: {
    smallCalendar: smallCalendarReducer,
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
