import classNames from 'classnames';
import moment from 'moment';
import { useEffect, useMemo, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import {
  setListDates,
  clearListDates,
  chooseStartDate,
} from '../../../features/smallCalendar/smallCalendarSlice';
import { Iday } from '../../../types/day';
import style from './month.module.scss';

const allCountDays = 35;

type Props = {
  currentDate: moment.Moment;
  show: boolean;
};

export const Month: React.FC<Props> = ({ currentDate, show }) => {
  const [days, setDays] = useState<Iday[]>([]);
  const [startDay, setStartDay] = useState(false);
  const dispatch = useAppDispatch();
  const listDates = useAppSelector(
    (state) => state.smallCalendar.listChooseDates
  );

  useEffect(() => {
    const result = [];

    for (let i = 0; i < currentDate.daysInMonth(); i++) {
      const date = moment(currentDate).date(i + 1);
      result.push({ date: date, value: i + 1, type: 'current' });
    }
    setDays(result);

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

    if (allCountDays - result.length && result.length > 0) {
      const nextMonth = currentDate.clone().add(1, 'month');
      const count = allCountDays - result.length;

      for (let i = 1; i <= count; i++) {
        const dayOfMonth = nextMonth.clone().date(i);
        result.push({
          date: dayOfMonth,
          value: dayOfMonth.date(),
          type: 'other',
        });
      }
    }
  }, [currentDate]);

  const initialStartDate = (day: Iday) => {
    dispatch(chooseStartDate(day.date.toISOString()));
  };

  const handlerMouseDown = (day: Iday) => {
    setStartDay(true);
    if (day.date.format('DD') !== moment(listDates[0]).format('DD')) {
      dispatch(clearListDates());
      dispatch(setListDates(day.date.toISOString()));
    }
  };

  const handlerOnMouseUp = (day: Iday) => {
    setStartDay(false);
  };

  function getDaysInRange(
    startDate: moment.Moment,
    endDate: moment.Moment,
    reverse: boolean
  ): void {
    const days = [];
    let currentDate = startDate.clone();

    while (
      (reverse && currentDate.isSameOrAfter(endDate)) ||
      (!reverse && currentDate.isSameOrBefore(endDate))
    ) {
      days.push(currentDate.clone().toISOString());
      currentDate = reverse
        ? currentDate.subtract(1, 'day')
        : currentDate.add(1, 'day');
    }

    dispatch(setListDates(days));
  }

  const handlerOnMouseOver = (day: Iday) => {
    if (startDay && day.date.format('MM') === currentDate.format('MM')) {
      if (
        (moment(listDates[0]).isoWeek() === day.date.isoWeek() ||
          moment(listDates[0]).isoWeek() !== day.date.isoWeek()) &&
        startDay &&
        moment(listDates[0]).isSameOrAfter(day.date)
      ) {
        getDaysInRange(moment(listDates[0]), day.date, true);
      }
      if (
        (moment(listDates[0]).isoWeek() === day.date.isoWeek() ||
          moment(listDates[0]).isoWeek() !== day.date.isoWeek()) &&
        startDay &&
        moment(listDates[0]).isSameOrBefore(day.date)
      ) {
        getDaysInRange(moment(listDates[0]), day.date, false);
      }
    }
  };

  const checkSmall = () => {
    let smallest = listDates[0];
    listDates.forEach((el) => {
      if (moment(el).isBefore(smallest)) {
        smallest = el;
      }
    });
    return smallest;
  };

  const checkToday = (day: Iday) => {
    return day.date.format('DD-MM-YYYY') === moment().format('DD-MM-YYYY');
  };

  const checkStartSelectDate = (day: Iday) => {
    return (
      (day.date.toISOString() === listDates[listDates.length - 1] &&
        day.date.isBefore(moment(listDates[0]))) ||
      day.date.weekday() === 1 ||
      (day.date.format('DD') === moment(listDates[0]).format('DD') &&
        listDates.length === 1) ||
      (day.date.toISOString() === listDates[0] &&
        listDates.some((date) => moment(date).isAfter(day.date)))
    );
  };

  const checkEndSelectedDay = (day: Iday) => {
    return (
      (day.date.toISOString() === listDates[listDates.length - 1] &&
        day.date.isAfter(moment(listDates[0]))) ||
      day.date.weekday() === 0 ||
      listDates.length === 1 ||
      (day.date.toISOString() === listDates[0] &&
        listDates.some((date) => moment(date).isBefore(day.date)))
    );
  };

  const checkSelectedDay = (day: Iday) => {
    return listDates.some(
      (el) => moment(el).format('DD-MM-YYYY') === day.date.format('DD-MM-YYYY')
    );
  };

  const test = useMemo(() => {
    return days.map((day: Iday) => (
      <div
        className={classNames(style.day, {
          [style['no_current']]: day.type === 'other',
          [style['today']]: checkToday(day) && show,
          [style['several_date']]: checkSelectedDay(day) && show,
          [style['start-selected']]: checkStartSelectDate(day) && show,
          [style['end-selected']]: checkEndSelectedDay(day) && show,
        })}
        key={day.date.valueOf()}
        onClick={() => initialStartDate(day)}
        onMouseDown={() => handlerMouseDown(day)}
        onMouseUp={() => handlerOnMouseUp(day)}
        onMouseOver={() => handlerOnMouseOver(day)}
      >
        {day.value}
      </div>
    ));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [days, listDates, handlerOnMouseUp, handlerOnMouseOver]);

  return <div className={style.month}>{test}</div>;
};
