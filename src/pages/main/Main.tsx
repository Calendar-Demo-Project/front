import { useEffect, useMemo, useRef, useState } from 'react';
import { Header } from '../../components/header/Header';
import { SaidBar } from '../../components/said-bar/SaidBar';
import SliderRef from 'react-slick';
import { MainCalendar } from '../../components/main-calendar/MainCalendar';
import { useAppSelector } from '../../app/hooks';

export const Main = () => {
  const [nav1, setNav1] = useState<SliderRef | null>(null);
  const [nav2, setNav2] = useState<SliderRef | null>(null);
  const slider1 = useRef<SliderRef>(null);
  const slider2 = useRef<SliderRef>(null);
  const typeCalendar = useAppSelector(
    (state) => state.mainCalendar.typeCalendar
  );

  useEffect(() => {
    setNav1(slider1.current);
    setNav2(slider2.current);
  }, [typeCalendar]);

  const nextSlide = () => {
    if (slider2.current) {
      slider2.current.slickNext();
    }
  };

  const prevSlide = () => {
    if (slider2.current) {
      slider2.current.slickPrev();
    }
  };

  const renderCalendar = useMemo(() => {
    return <MainCalendar MyRef={slider2} nav1={nav1} />;
  }, [nav1]);

  return (
    <>
      <Header next={nextSlide} prev={prevSlide} />
      <SaidBar MyRef={slider1} nav2={nav2} next={nextSlide} prev={prevSlide} />
      {renderCalendar}
    </>
  );
};
