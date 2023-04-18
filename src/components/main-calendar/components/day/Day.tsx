import moment from 'moment';
import { useAppSelector } from '../../../../app/hooks';

import style from './day.module.scss';

export const Day = () => {
  const currentDay = useAppSelector((state) => state.smallCalendar.currentDate);
  const offset = 3;
  const timezone = moment().utcOffset(offset).format('ZZ');

  const hoursOfDay = [];

  for (let i = 0; i < 24; i++) {
    const hour = moment().utcOffset(0).hour(i);
    const time = hour.format('hA');
    hoursOfDay.push(time);
  }

  return (
    <div className={style.wrapper}>
      <div className={style.day_info}>
        <div className={style.timezone}>{`GMT ${timezone}`}</div>
        <div className={style.count_day}>
          <div className={style.name_day}>
            {moment(currentDay).format('ddd')}
          </div>
          <div className={style.number_day}>
            {moment(currentDay).format('DD')}
          </div>
        </div>
      </div>
      <div className={style.wrapper_hours}>
        <div className={style.count_hours}>
          {hoursOfDay.map((el: string) => {
            return (
              <div className={style.hour} key={el}>
                {el}
              </div>
            );
          })}
        </div>
        <div className={style.time_fields}>
          {hoursOfDay.map((el: string) => {
            return <div className={style.time} key={el}></div>;
          })}
        </div>
      </div>
    </div>
  );
};
