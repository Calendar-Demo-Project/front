import { useAppSelector } from '../../app/hooks';
import { SmallCalendar } from '../small-calendar/SmallCalendar';
import { Acardion } from './components/acardion/Acardion';

import style from './saidBar.module.scss';

export const SaidBar = () => {
  const tasks = useAppSelector((state) => state.TECManager.tasksList);
  const events = useAppSelector((state) => state.TECManager.eventsList);
  const category = useAppSelector((state) => state.TECManager.categories);

  return (
    <div className={style.wrapper}>
      <SmallCalendar />
      <div>
        <Acardion title="Tasks" list={tasks} />
        <Acardion title="Events" list={events} />
        <Acardion title="Categories" list={category} />
      </div>
    </div>
  );
};
