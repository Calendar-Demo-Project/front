import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import { smallCalendarReducer } from '../features/smallCalendar/smallCalendarSlice';
import { TECmanagerReducer } from '../features/tecManager/tecManager';

export const store = configureStore({
  reducer: {
    smallCalendar: smallCalendarReducer,
    TECManager: TECmanagerReducer,
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
