import { useEffect, useMemo, useState, useCallback } from 'react';
import Slider from 'react-slick';
import moment from 'moment';
import { Week } from './components/week/Week';
import { Month } from './components/month/Month';
import rigthArrow from '../../public/images/icons/right-arrow.png';
import leftArrow from '../../public/images/icons/leftArrow.png';
import { Arrow } from './components/arrow/Arrow';

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

type Props = {
  MyRef: React.RefObject<SliderRef>;
  nav2: any;
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
  const selectDate = useAppSelector((state) => state.smallCalendar.selectDate);
  const listDates = useAppSelector(
    (state) => state.smallCalendar.listChooseDates
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
    if (days.length < 1) {
      setDays([...daysOfMonth, ...otherMonthDays]);
    }
  }, [days.length, daysOfMonth, otherMonthDays]);

  const settings = {
    dots: false,
    infinite: true,
    speed: 400,
    slidesToShow: 1,
    slidesToScroll: 1,
    swipe: false,
    arrows: true,
    asNavFor: props.nav2,
    nextArrow: (
      <Arrow
        func={() => {
          dispatch(
            changeDate(
              moment(currentDate).clone().add(1, 'month').toISOString()
            )
          );
          setShow(false);
          if (
            +moment(currentDate).format('MM') -
              +moment(listDates[0]).format('MM') ===
            1
          ) {
            dispatch(clearListDates());
          }
        }}
        url={rigthArrow}
        condition={
          moment(selectDate).format('MM') > moment(currentDate).format('MM')
        }
        myStyle={{
          display: 'flex',
          alignItems: 'center',
          width: '28px',
          height: '28px',
          position: 'absolute',
          top: '-50px',
          left: '230px',
          cursor: 'pointer',
        }}
      />
    ),
    prevArrow: (
      <Arrow
        func={() => {
          dispatch(
            changeDate(
              moment(currentDate).clone().subtract(1, 'month').toISOString()
            )
          );
          setShow(false);
          if (
            +moment(currentDate).format('MM') -
              +moment(listDates[0]).format('MM') ===
            -1
          ) {
            dispatch(clearListDates());
          }
        }}
        url={leftArrow}
        condition={
          moment(selectDate).format('MM') < moment(currentDate).format('MM')
        }
        myStyle={{
          display: 'flex',
          alignItems: 'center',
          width: '28px',
          height: '28px',
          position: 'absolute',
          top: '-50px',
          left: '190px',
          cursor: 'pointer',
        }}
        type="prev"
      />
    ),
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

  const initialStartDate = useCallback(
    (day: Iday) => {
      dispatch(chooseStartDate(day.date.toISOString()));
      if (day.date.format('YYYY') !== currentDate.format('YYYY')) {
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
          [style['today']]: checkToday(day) && show,
          [style['several_date']]: checkSelectedDay(day) && show,
          [style['start-selected']]: checkStartSelectDate(day) && show,
          [style['end-selected']]: checkEndSelectedDay(day) && show,
        })}
        key={day.date.valueOf()}
        onClick={() => initialStartDate(day)}
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
    days,
    handlerMouseDown,
    handlerOnMouseOver,
    initialStartDate,
    isMouseDown,
    show,
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
        <Slider {...settings} ref={props.MyRef}>
          <div>
            <Week />
            <Month
              children={renderDays}
              handlerOnMouseUp={handlerOnMouseUp}
              handleOnMouseLeave={handleOnMouseLeave}
            />
          </div>
          <div>
            <Week />
            <Month
              children={renderDays}
              handlerOnMouseUp={handlerOnMouseUp}
              handleOnMouseLeave={handleOnMouseLeave}
            />
          </div>
        </Slider>
      </div>
    </div>
  );
});
