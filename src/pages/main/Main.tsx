import { useEffect, useRef, useState } from 'react';
import { Header } from '../../components/header/Header';
import { SaidBar } from '../../components/said-bar/SaidBar';
import SliderRef from 'react-slick';
import { MainCalendar } from '../../components/main-calendar/MainCalendar';

export const Main = () => {
  const [nav1, setNav1] = useState<SliderRef | null>(null);
  const [nav2, setNav2] = useState<SliderRef | null>(null);
  const slider1 = useRef<SliderRef>(null);
  const slider2 = useRef<SliderRef>(null);

  useEffect(() => {
    setNav1(slider1.current);
    setNav2(slider2.current);
  }, []);

  const nextSlide = () => {
    if (slider1.current) {
      slider1.current.slickNext();
    }
  };

  const prevSlide = () => {
    if (slider1.current) {
      slider1.current.slickPrev();
    }
  };
  return (
    <>
      <Header next={nextSlide} prev={prevSlide} />
      <SaidBar MyRef={slider1} nav2={nav2} />
      <MainCalendar MyRef={slider2} nav1={nav1} />
    </>
  );
};
