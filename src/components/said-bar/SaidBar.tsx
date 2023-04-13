import React from 'react';
import { useAppSelector } from '../../app/hooks';
import { SmallCalendar } from '../small-calendar/SmallCalendar';
import { Acardion } from './components/acardion/Acardion';
import SliderRef from 'react-slick';

import style from './saidBar.module.scss';

type Props = {
  MyRef: React.RefObject<SliderRef>;
  nav2: any;
};

export const SaidBar = React.forwardRef((props: Props, ref) => {
  const tasks = useAppSelector((state) => state.TECManager.tasksList);
  const events = useAppSelector((state) => state.TECManager.eventsList);
  const category = useAppSelector((state) => state.TECManager.categories);

  return (
    <div className={style.wrapper}>
      <SmallCalendar MyRef={props.MyRef} nav2={props.nav2} />
      <div>
        <Acardion title="Tasks" list={tasks} />
        <Acardion title="Events" list={events} />
        <Acardion title="Categories" list={category} />
      </div>
    </div>
  );
});
