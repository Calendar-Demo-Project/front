import { Iday } from '../../../../../types/day';
import style from './day.module.scss';

type Props = {
  day: Iday;
};

export const Day: React.FC<Props> = ({ day }) => {
  return <div className={style.day}>{day.value}</div>;
};
