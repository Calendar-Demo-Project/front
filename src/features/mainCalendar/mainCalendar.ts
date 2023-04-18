import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ImainCalendar {
  typeCalendar: 'day' | 'week' | 'month';
}

const initialState: ImainCalendar = {
  typeCalendar: 'month',
};

export const mainCalendarSlice = createSlice({
  name: 'mainCalendar',
  initialState,
  reducers: {
    chooseTypeCalndar: (
      state,
      action: PayloadAction<'day' | 'week' | 'month'>
    ) => {
      state.typeCalendar = action.payload;
    },
  },
});

export const { chooseTypeCalndar } = mainCalendarSlice.actions;
export const mainCalendarReducer = mainCalendarSlice.reducer;
