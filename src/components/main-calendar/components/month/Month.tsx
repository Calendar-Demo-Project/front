import moment from 'moment';
import { useEffect, useMemo, useState } from 'react';
import { useAppSelector } from '../../../../app/hooks';
import { Iday } from '../../../../types/day';
import { Day } from './day/Day';
import { WeekMonth } from './week/Week';

import style from './month.module.scss';

const allCountDays = 35;

export const Month = () => {
  const currentDate = useAppSelector((state) =>
    moment(state.smallCalendar.currentDate)
  );
  const [days, setDays] = useState<Iday[]>([]);
  const [current, setCurrent] = useState(currentDate.format('DD-MM-YYYY'));

  const daysOfMonth = useMemo(() => {
    const result = [];

    for (let i = 0; i < currentDate.daysInMonth(); i++) {
      const date = moment(currentDate).date(i + 1);
      result.push({ date: date, value: i + 1, type: 'current' });
    }

    const firstDayOfMonth = currentDate.clone().startOf('month');

    const lastDayOfPreviousMonth = firstDayOfMonth.clone().subtract(1, 'day');

    const lastDaysOfPreviousMonth = [];

    for (let i = 0; i < firstDayOfMonth.day() - 1; i++) {
      lastDaysOfPreviousMonth.push({
        date: lastDayOfPreviousMonth.clone().subtract(i, 'day'),
        value: lastDayOfPreviousMonth.clone().subtract(i, 'day').date(),
        type: 'other',
      });
    }

    if (firstDayOfMonth.day()) {
      for (let i = 0; i < lastDaysOfPreviousMonth.reverse().length; i++) {
        result.unshift(lastDaysOfPreviousMonth.reverse()[i]);
      }
    }

    return result;
  }, [currentDate]);

  const otherMonthDays = useMemo(() => {
    const result = [];

    if (allCountDays - daysOfMonth.length && daysOfMonth.length > 0) {
      const nextMonth = currentDate.clone().add(1, 'month');
      const nameDay = daysOfMonth[daysOfMonth.length - 1].date.format('dddd');
      const countDay = daysOfMonth[daysOfMonth.length - 1].value;
      const count = allCountDays - daysOfMonth.length;

      if (nameDay === 'Monday' && countDay === 31) {
        for (let i = 1; i <= 6; i++) {
          const dayOfMonth = nextMonth.clone().date(i);
          result.push({
            date: dayOfMonth,
            value: dayOfMonth.date(),
            type: 'other',
          });
        }
      } else {
        for (let i = 1; i <= count; i++) {
          const dayOfMonth = nextMonth.clone().date(i);
          result.push({
            date: dayOfMonth,
            value: dayOfMonth.date(),
            type: 'other',
          });
        }
      }
    }

    return result;
  }, [currentDate, daysOfMonth]);

  useEffect(() => {
    if (current !== currentDate.format('DD-MM-YYYY')) {
      setDays([]);
      setCurrent(currentDate.format('DD-MM-YYYY'));
    }
  }, [current, currentDate]);

  useEffect(() => {
    if (days.length < 1) {
      setDays([...daysOfMonth, ...otherMonthDays]);
    }
  }, [days.length, daysOfMonth, otherMonthDays]);

  return (
    <>
      <div>
        <WeekMonth />
        <div className={style.wrapper}>
          {days.map((el: Iday) => (
            <Day
              day={el}
              key={Math.random() * (9999 - 1) + 1}
              last={days[days.length - 1] === el}
              preliminary={days[days.length - 7] === el}
            />
          ))}
        </div>
      </div>
    </>
  );
};
