import { createSlice /* PayloadAction */ } from '@reduxjs/toolkit';
import { ICategory, IEvent, ITask } from '../../types/elementList';

export interface ITECManager {
  tasksList: ITask[];
  eventsList: IEvent[];
  categories: ICategory[];
}

const initialState: ITECManager = {
  tasksList: [
    {
      type: 'task',
      text: 'Walk with the dog',
      active: true,
      color: '#FFAD05',
    },
    {
      type: 'task',
      text: 'Meditation for 15 minutes',
      active: true,
      color: '#377BFF',
    },
  ],
  eventsList: [
    {
      type: 'event',
      text: 'Take out the rubbish',
      active: true,
      color: '#FFAD05',
    },
    {
      type: 'event',
      text: 'Go to the gym',
      active: true,
      color: '#377BFF',
    },
  ],
  categories: [
    {
      type: 'category',
      text: 'Take out the rubbish',
      color: '#FFAD05',
    },
    {
      type: 'category',
      text: 'Go to the gym',
      color: '#377BFF',
    },
  ],
};

export const TECManagerSlice = createSlice({
  name: 'TECmanager',
  initialState,
  reducers: {},
});

export const TECmanagerReducer = TECManagerSlice.reducer;
