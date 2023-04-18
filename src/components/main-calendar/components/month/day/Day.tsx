import classNames from 'classnames';
import moment from 'moment';
import { useAppSelector } from '../../../../../app/hooks';

import { Iday } from '../../../../../types/day';
import style from './day.module.scss';

type Props = {
  day: Iday;
  last: boolean;
  preliminary: boolean;
};

export const Day: React.FC<Props> = ({ day, last, preliminary }) => {
  const listDate = useAppSelector(
    (state) => state.smallCalendar.listChooseDates
  );

  return (
    <div
      className={classNames(style.day, {
        [style['last']]: last,
        [style['preliminary']]: preliminary,
      })}
    >
      <span
        className={classNames(style.date, {
          [style['selected']]: listDate.some(
            (el: string) => el === day.date.toISOString()
          ),
        })}
      >
        {day.date.format('DD-MM-YYY') !== moment().format('DD-MM-YYY') ? (
          day.value
        ) : (
          <span className={style.today}>{day.value}</span>
        )}
      </span>
    </div>
  );
};
