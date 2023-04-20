import { useEffect, useMemo, useState, useCallback } from 'react';
import moment from 'moment';
import { Week } from './components/week/Week';
import { Month } from './components/month/Month';
import rigthArrow from '../../public/images/icons/right-arrow.png';
import leftArrow from '../../public/images/icons/leftArrow.png';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  changeDate,
  chooseStartDate,
  clearListDates,
  setListDates,
} from '../../features/smallCalendar/smallCalendarSlice';
import SliderRef from 'react-slick';

import style from './smallCalendar.module.scss';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import React from 'react';
import { Iday } from '../../types/day';
import classNames from 'classnames';
import { activeDragTask } from '../../features/tecManager/tecManager';

type Props = {
  MyRef: React.RefObject<SliderRef>;
  nav2: any;
  next: () => void;
  prev: () => void;
};

const allCountDays = 35;

export const SmallCalendar = React.forwardRef((props: Props, ref) => {
  const [show, setShow] = useState(true);
  const [days, setDays] = useState<Iday[]>([]);
  const [startDay, setStartDay] = useState(false);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const currentDate = useAppSelector((state) =>
    moment(state.smallCalendar.currentDate)
  );
  const [current, setCurrent] = useState(currentDate.format('DD-MM-YYYY'));
  const listDates = useAppSelector(
    (state) => state.smallCalendar.listChooseDates
  );
  const typeCalendar = useAppSelector(
    (state) => state.mainCalendar.typeCalendar
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (current !== currentDate.format('DD-MM-YYYY')) {
      setDays([]);
      setCurrent(currentDate.format('DD-MM-YYYY'));
    }
  }, [current, currentDate]);

  const daysOfMonth = useMemo(() => {
    const result = [];

    for (let i = 0; i < currentDate.daysInMonth(); i++) {
      const date = moment(currentDate).date(i + 1);
      result.push({ date: date, value: i + 1, type: 'current' });
    }

    const firstDayOfMonth = currentDate.clone().startOf('month');

    const lastDayOfPreviousMonth = firstDayOfMonth.clone().subtract(1, 'day');

    const lastDaysOfPreviousMonth = [];

    const count = firstDayOfMonth.day() === 0 ? 7 : firstDayOfMonth.day();

    for (let i = 0; i < count - 1; i++) {
      lastDaysOfPreviousMonth.push({
        date: lastDayOfPreviousMonth.clone().subtract(i, 'day'),
        value: lastDayOfPreviousMonth.clone().subtract(i, 'day').date(),
        type: 'other',
      });
    }

    for (let i = 0; i < lastDaysOfPreviousMonth.reverse().length; i++) {
      result.unshift(lastDaysOfPreviousMonth.reverse()[i]);
    }

    return result;
  }, [currentDate]);

  const otherMonthDays = useMemo(() => {
    const result = [];

    if (allCountDays - daysOfMonth.length && daysOfMonth.length > 0) {
      const nextMonth = currentDate.clone().add(1, 'month');
      const lastDayOfMonth = currentDate.clone().endOf('month');
      const lastDayOfWeek = lastDayOfMonth.day();

      for (let i = 1; i <= 7 - lastDayOfWeek; i++) {
        const dayOfMonth = nextMonth.clone().date(i);
        result.push({
          date: dayOfMonth,
          value: dayOfMonth.date(),
          type: 'other',
        });
      }
    }

    return result;
  }, [currentDate, daysOfMonth]);

  useEffect(() => {
    if (days.length < 1) {
      setDays([...daysOfMonth, ...otherMonthDays]);
    }
  }, [days.length, daysOfMonth, otherMonthDays]);

  const next = () => {
    console.log(1);
    if (typeCalendar !== 'month') {
      props.prev();
    }
    dispatch(
      changeDate(moment(currentDate).clone().add(1, typeCalendar).toISOString())
    );
    typeCalendar === 'month' && setShow(false);
    if (
      +moment(currentDate).format('MM') - +moment(listDates[0]).format('MM') ===
      1
    ) {
      dispatch(clearListDates());
    }
  };

  const prev = () => {
    if (typeCalendar !== 'month') {
      props.next();
    }
    console.log(currentDate.format('DD-MM-YYYY'));
    dispatch(
      changeDate(
        moment(currentDate).clone().subtract(1, typeCalendar).toISOString()
      )
    );
    typeCalendar === 'month' && setShow(false);
    if (
      +moment(currentDate).format('MM') - +moment(listDates[0]).format('MM') ===
      -1
    ) {
      dispatch(clearListDates());
    }
  };

  useEffect(() => {
    if (!show) {
      setTimeout(() => {
        setShow(true);
      }, 290);
    }
  }, [show]);

  const handlerOnMouseUp = () => {
    setStartDay(false);
  };

  const handleOnMouseLeave = () => {
    setIsMouseDown(false);
  };

  const checkToday = (day: Iday) => {
    return day.date.format('DD-MM-YYYY') === moment().format('DD-MM-YYYY');
  };

  const checkSelectedDay = useCallback(
    (day: Iday) => {
      return listDates.some(
        (el) =>
          moment(el).format('DD-MM-YYYY') === day.date.format('DD-MM-YYYY')
      );
    },
    [listDates]
  );

  const checkStartSelectDate = useCallback(
    (day: Iday) => {
      return (
        (day.date.toISOString() === listDates[listDates.length - 1] &&
          day.date.isBefore(moment(listDates[0]))) ||
        day.date.weekday() === 1 ||
        (day.date.format('DD') === moment(listDates[0]).format('DD') &&
          listDates.length === 1) ||
        (day.date.toISOString() === listDates[0] &&
          listDates.some((date) => moment(date).isAfter(day.date)))
      );
    },
    [listDates]
  );

  const checkEndSelectedDay = useCallback(
    (day: Iday) => {
      return (
        (day.date.toISOString() === listDates[listDates.length - 1] &&
          day.date.isAfter(moment(listDates[0]))) ||
        day.date.weekday() === 0 ||
        listDates.length === 1 ||
        (day.date.toISOString() === listDates[0] &&
          listDates.some((date) => moment(date).isBefore(day.date)))
      );
    },
    [listDates]
  );

  useEffect(() => {
    if (typeCalendar !== 'month' && listDates.length) {
      if (currentDate !== moment(listDates[0])) {
        dispatch(changeDate(listDates[0]));
      }
    }
    // this put currentDate you can't because day won't change
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, listDates, typeCalendar]);

  const initialStartDate = useCallback(
    (day: Iday) => {
      dispatch(chooseStartDate(day.date.toISOString()));
      if (day.date.format('YYYY') !== currentDate.format('YYYY')) {
        console.log(3);
        dispatch(changeDate(day.date.toISOString()));
      }
    },
    [dispatch, currentDate]
  );

  const handlerMouseDown = useCallback(
    (day: Iday) => {
      setIsMouseDown(true);
      dispatch(clearListDates());
      setStartDay(true);
      if (day.date.format('DD') !== moment(listDates[0]).format('DD')) {
        dispatch(clearListDates());
        dispatch(setListDates(day.date.toISOString()));
      }
    },
    [dispatch, listDates]
  );

  const getDaysInRange = useCallback(
    (
      startDate: moment.Moment,
      endDate: moment.Moment,
      reverse: boolean
    ): string[] => {
      const days = [];
      let currentDate = startDate.clone();
      if (reverse) {
        while (currentDate.isSameOrAfter(endDate) && isMouseDown) {
          days.push(currentDate.clone().toISOString());
          currentDate = currentDate.subtract(1, 'day');
        }
      } else {
        while (currentDate.isSameOrBefore(endDate) && isMouseDown) {
          days.push(currentDate.clone().toISOString());
          currentDate = currentDate.add(1, 'day');
        }
      }
      return days;
    },
    [isMouseDown]
  );

  const handlerOnMouseOver = useCallback(
    (day: Iday, isMouseDown: boolean) => {
      if (isMouseDown && startDay) {
        const monthMatch = day.date.format('MM') === currentDate.format('MM');
        const isSameOrAfter = moment(listDates[0]).isSameOrAfter(day.date);
        const isSameOrBefore = moment(listDates[0]).isSameOrBefore(day.date);
        if (
          monthMatch &&
          isSameOrAfter &&
          day.date.format('MM') === currentDate.format('MM')
        ) {
          const days = getDaysInRange(moment(listDates[0]), day.date, true);
          dispatch(setListDates(days));
        }
        if (
          monthMatch &&
          isSameOrBefore &&
          day.date.format('MM') === currentDate.format('MM')
        ) {
          const days = getDaysInRange(moment(listDates[0]), day.date, false);
          dispatch(setListDates(days));
        }
      }
    },
    [currentDate, getDaysInRange, listDates, startDay, dispatch]
  );

  const renderDays = useMemo(() => {
    return days.map((day: Iday) => (
      <div
        className={classNames(style.day, {
          [style['no_current']]: day.type === 'other',
          [style['current_day']]:
            (moment(currentDate).format('DD-MM-YYYY') ===
              day.date.format('DD-MM-YYYY') &&
              typeCalendar === 'day') ||
            (moment(currentDate)
              .startOf('isoWeek')
              .startOf('day')
              .format('DD-MM-YYYY') === day.date.format('DD-MM-YYYY') &&
              typeCalendar === 'week'),
          [style['today']]: checkToday(day) && show,
          [style['several_date']]:
            checkSelectedDay(day) && show && typeCalendar === 'month',
          [style['start-selected']]:
            checkStartSelectDate(day) && show && typeCalendar === 'month',
          [style['end-selected']]:
            checkEndSelectedDay(day) && show && typeCalendar === 'month',
        })}
        key={day.date.valueOf()}
        onClick={() => {
          if (typeCalendar !== 'month') {
            if (day.date.isBefore(moment(currentDate), 'day')) {
              props.prev();
            } else {
              props.next();
            }
            dispatch(changeDate(day.date.toISOString()));
          } else {
            initialStartDate(day);
          }
        }}
        onMouseDown={() => handlerMouseDown(day)}
        onMouseOver={() => handlerOnMouseOver(day, isMouseDown)}
      >
        {day.value}
      </div>
    ));
  }, [
    checkEndSelectedDay,
    checkSelectedDay,
    checkStartSelectDate,
    currentDate,
    days,
    dispatch,
    handlerMouseDown,
    handlerOnMouseOver,
    initialStartDate,
    isMouseDown,
    props,
    show,
    typeCalendar,
  ]);

  return (
    <div>
      <div className={style.year}>
        <div className={style.month_name}>
          {moment(currentDate).format('MMMM')}
        </div>
        <div className={style.count_year}>
          {moment(currentDate).format('YYYY')}
        </div>
      </div>
      <div className={style.wrapper_slider}>
        <div style={{ position: 'relative' }}>
          <div
            className={style.prev}
            onClick={() => {
              prev();
              props.prev();
              dispatch(activeDragTask(''));
            }}
          >
            <img src={leftArrow} alt="arrow" />
          </div>
          <div
            className={style.next}
            onClick={() => {
              next();
              props.next();
              dispatch(activeDragTask(''));
            }}
          >
            <img src={rigthArrow} alt="arrow" />
          </div>
          <Week />
          <Month
            children={renderDays}
            handlerOnMouseUp={handlerOnMouseUp}
            handleOnMouseLeave={handleOnMouseLeave}
          />
        </div>
      </div>
    </div>
  );
});
