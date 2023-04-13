import { useRef } from 'react';
import { Header } from '../../components/header/Header';
import { SaidBar } from '../../components/said-bar/SaidBar';
import SliderRef from 'react-slick';
import { MainCalendar } from '../../components/main-calendar/MainCalendar';

export const Main = () => {
  const sliderRef = useRef<SliderRef>(null);

  const nextSlide = () => {
    if (sliderRef.current) {
      sliderRef.current.slickNext();
    }
  };

  const prevSlide = () => {
    if (sliderRef.current) {
      sliderRef.current.slickPrev();
    }
  };
  return (
    <>
      <Header next={nextSlide} prev={prevSlide} />
      <SaidBar MyRef={sliderRef} />
      <MainCalendar />
    </>
  );
};
