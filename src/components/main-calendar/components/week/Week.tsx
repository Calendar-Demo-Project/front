import moment from 'moment';
import { useCallback, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { useDrop } from 'react-dnd';
import style from './week.module.scss';
import { DraggableBox } from '../../../task/Task';
import { activeDragTask } from '../../../../features/tecManager/tecManager';

export const Week = () => {
  const currentDay = useAppSelector((state) => state.smallCalendar.currentDate);
  const offset = 3;
  const timezone = moment().utcOffset(offset).format('ZZ');
  const dragTask = useAppSelector((state) => state.TECManager.dragTask);
  const dispatch = useAppDispatch();
  const days = [];
  const startOfWeek = moment(currentDay).startOf('week');
  const [postionElement, setPosition] = useState({ x: 90, y: 0 });
  const dropRef = useRef<any>(null);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const hoursOfDay: string[] = [];

  const handleDrop = useCallback((item: any, monitor: any) => {
    if (dropRef.current) {
      const parentRect = dropRef.current.getBoundingClientRect();
      if (monitor.getClientOffset().y - parentRect.top + 60 < 85) {
        setPosition({
          x: 0,
          y: 0,
        });
      } else {
        setPosition({
          x: monitor.getClientOffset().y - parentRect.top + 60,
          y: 0,
        });
      }
    }
  }, []);

  const [, drop] = useDrop(() => ({
    accept: 'box',
    drop: handleDrop,
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  for (let i = 0; i < 24; i++) {
    const hour = moment().utcOffset(0).hour(i);
    const time = hour.format('hA');
    hoursOfDay.push(time);
  }

  for (let i = 1; i <= 7; i++) {
    const day = moment(startOfWeek).add(i, 'days');
    days.push(day);
  }

  const renderHours = useCallback(
    (day: moment.Moment, key: string) => {
      const chooseDay = (day: moment.Moment) => {
        dispatch(activeDragTask(day.toISOString()));
      };

      function handleClick(event: React.MouseEvent<any>, day: moment.Moment) {
        if (dragTask !== day.toISOString()) {
          const rect = dropRef.current.getBoundingClientRect();
          const y = event.clientY - rect.top;
          setPosition({
            x: y + 85,
            y: 0,
          });
        }

        if (
          dragTask === day.toISOString() &&
          Array.from((event.target as HTMLElement).classList)[0].includes(
            'week'
          )
        ) {
          dispatch(activeDragTask(''));
        } else {
          dispatch(activeDragTask(day.toISOString()));
        }
      }
      return (
        <div
          className={style.time_fields}
          ref={dropRef}
          onClick={(event) => handleClick(event, day)}
          key={key}
        >
          {dragTask === day.toISOString() && (
            <DraggableBox
              positionX={postionElement.x}
              positionY={postionElement.y}
              heigth={60}
              type="week"
            />
          )}
          {hoursOfDay.map((el: string) => {
            return (
              <div
                className={style.time}
                key={el}
                onClick={() => chooseDay(day)}
              ></div>
            );
          })}
        </div>
      );
    },
    [dispatch, dragTask, hoursOfDay, postionElement.x, postionElement.y]
  );

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
        <div className={style.hours} ref={drop}>
          {days.map((el) => renderHours(el, el.toISOString()))}
        </div>
      </div>
    </div>
  );
};
