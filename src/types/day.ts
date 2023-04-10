import moment from 'moment';

export interface Iday {
  date: moment.Moment;
  value: number;
  type: string;
}
