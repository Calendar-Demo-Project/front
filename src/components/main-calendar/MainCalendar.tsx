import { Month } from './components/month/Month';
import style from './mainCalendar.module.scss';

export const MainCalendar = () => {
  return (
    <div className={style.wrapper}>
      <Month />
    </div>
  );
};
