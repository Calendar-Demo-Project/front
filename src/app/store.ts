import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import { smallCalendarReducer } from '../features/smallCalendar/smallCalendarSlice';
import { TECmanagerReducer } from '../features/tecManager/tecManager';
import { mainCalendarReducer } from '../features/mainCalendar/mainCalendar';

export const store = configureStore({
  reducer: {
    smallCalendar: smallCalendarReducer,
    TECManager: TECmanagerReducer,
    mainCalendar: mainCalendarReducer,
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
