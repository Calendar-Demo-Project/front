import { useEffect, useState } from 'react';
import Slider from 'react-slick';
import moment from 'moment';
import { Week } from './components/week/Week';
import { Month } from './components/month/Month';
import rigthArrow from '../../public/images/icons/right-arrow.png';
import leftArrow from '../../public/images/icons/leftArrow.png';
import { Arrow } from './components/arrow/Arrow';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { changeDate } from '../../features/smallCalendar/smallCalendarSlice';

import style from './smallCalendar.module.scss';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export const SmallCalendar = () => {
  const [show, setShow] = useState(true);
  const currentDate = useAppSelector(
    (state) => state.smallCalendar.currentDate
  );
  const selectDate = useAppSelector((state) => state.smallCalendar.selectDate);
  const dispatch = useAppDispatch();

  const settings = {
    dots: false,
    infinite: true,
    speed: 400,
    slidesToShow: 1,
    slidesToScroll: 1,
    swipe: false,
    arrows: true,
    nextArrow: (
      <Arrow
        func={() => {
          dispatch(
            changeDate(
              moment(currentDate).clone().add(1, 'month').toISOString()
            )
          );
          setShow(false);
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
        <Slider {...settings}>
          <div>
            <Week />
            <Month currentDate={moment(currentDate)} show={show} />
          </div>
          <div>
            <Week />
            <Month currentDate={moment(currentDate)} show={show} />
          </div>
        </Slider>
      </div>
    </div>
  );
};
