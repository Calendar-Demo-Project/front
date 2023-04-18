import moment from 'moment';
import { useMemo } from 'react';
import { useAppSelector } from '../../../../app/hooks';
import style from './week.module.scss';

export const Week = () => {
  const currentDay = useAppSelector((state) => state.smallCalendar.currentDate);
  const offset = 3;
  const timezone = moment().utcOffset(offset).format('ZZ');
  const days = [];
  const startOfWeek = moment(currentDay).startOf('week');
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const hoursOfDay: string[] = [];

  for (let i = 0; i < 24; i++) {
    const hour = moment().utcOffset(0).hour(i);
    const time = hour.format('hA');
    hoursOfDay.push(time);
  }

  for (let i = 1; i <= 7; i++) {
    const day = moment(startOfWeek).add(i, 'days');
    days.push(day);
  }

  const renderHours = useMemo(() => {
    return (
      <div className={style.time_fields}>
        {hoursOfDay.map((el: string) => {
          return <div className={style.time} key={el}></div>;
        })}
      </div>
    );
  }, [hoursOfDay]);

  return (
    <div className={style.wrapper}>
      <div className={style.week_info}>
        <div className={style.timezone}>{`GMT ${timezone}`}</div>
        <div className={style.days}>
          {days.map((el) => (
            <div key={el.day()} className={style.day_info}>
              <div className={style.name_day}>{el.format('ddd')}</div>
              <div className={style.number_day}>{el.format('DD')}</div>
            </div>
          ))}
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
        <div className={style.hours}>
          {renderHours}
          {renderHours}
          {renderHours}
          {renderHours}
          {renderHours}
          {renderHours}
          {renderHours}
        </div>
      </div>
    </div>
  );
};
