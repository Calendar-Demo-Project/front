import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import moment from 'moment';

export interface IsmallCalendar {
  currentDate: string;
  selectDate: string;
  listChooseDates: string[];
}

const initialState: IsmallCalendar = {
  currentDate: moment().toISOString(),
  selectDate: '',
  listChooseDates: [],
};

export const smallCalendarSlice = createSlice({
  name: 'smallCalendar',
  initialState,
  reducers: {
    changeDate: (state, action: PayloadAction<string>) => {
      state.currentDate = action.payload;
    },
    chooseStartDate: (state, action: PayloadAction<string>) => {
      state.selectDate = action.payload;
    },
    setListDates: (state, action: PayloadAction<string | string[]>) => {
      if (Array.isArray(action.payload)) {
        state.listChooseDates = action.payload.filter((item, index, self) => {
          return index === self.findIndex((t) => moment(t).isSame(item));
        });
      } else {
        state.listChooseDates.push(action.payload);
      }
    },
    clearListDates: (state) => {
      state.listChooseDates = [];
    },
    onlyMore: (state, action: PayloadAction<string>) => {
      state.listChooseDates = state.listChooseDates.filter((date, index) => {
        return (
          index === 0 ||
          moment(date).isSameOrAfter(moment(state.listChooseDates[0]))
        );
      });
    },
    onlyLess: (state, action: PayloadAction<string>) => {
      state.listChooseDates = state.listChooseDates.filter((date, index) => {
        return (
          index === 0 ||
          moment(date).isSameOrBefore(moment(state.listChooseDates[0]))
        );
      });
    },
  },
});

export const {
  changeDate,
  chooseStartDate,
  setListDates,
  clearListDates,
  onlyMore,
  onlyLess,
} = smallCalendarSlice.actions;

export const smallCalendarReducer = smallCalendarSlice.reducer;
