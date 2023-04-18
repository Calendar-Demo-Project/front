import { Month } from './components/month/Month';
import Slider from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import style from './mainCalendar.module.scss';
import React, { useMemo } from 'react';
import SliderRef from 'react-slick';
import { useAppSelector } from '../../app/hooks';
import { Day } from './components/day/Day';
import { Week } from './components/week/Week';

type Props = {
  MyRef: React.RefObject<SliderRef>;
  nav1: any;
};

export const MainCalendar = React.forwardRef((props: Props, ref) => {
  const typeCalendar = useAppSelector(
    (state) => state.mainCalendar.typeCalendar
  );

  const settings = {
    dots: false,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    asNavFor: props.nav1,
    swipe: false,
  };

  const renderCalendars = useMemo(() => {
    if (typeCalendar === 'month') {
      return <Month />;
    }
    if (typeCalendar === 'day') {
      return <Day />;
    }
    if (typeCalendar === 'week') {
      return <Week />;
    }
  }, [typeCalendar]);

  return (
    <div className={style.wrapper}>
      <Slider {...settings} ref={props.MyRef}>
        {renderCalendars}
        {renderCalendars}
      </Slider>
    </div>
  );
});
