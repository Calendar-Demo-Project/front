import React from 'react';
import moment from 'moment';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { useDrop } from 'react-dnd';

import style from './day.module.scss';
import { DraggableBox } from '../../../task/Task';
import { activeDragTask } from '../../../../features/tecManager/tecManager';

export const Day = React.memo(() => {
  const currentDay = useAppSelector((state) => state.smallCalendar.currentDate);
  const dragTask = useAppSelector((state) => state.TECManager.dragTask);
  const dispatch = useAppDispatch();
  const offset = 3;
  const timezone = React.useMemo(
    () => moment().utcOffset(offset).format('ZZ'),
    []
  );

  const [postionElement, setPosition] = React.useState({ x: 85, y: 80 });
  const dropRef = React.useRef<any>(null);

  const handleDrop = React.useCallback((item: any, monitor: any) => {
    if (dropRef.current) {
      const parentRect = dropRef.current.getBoundingClientRect();
      const clientOffset = monitor.getClientOffset();
      const y = clientOffset.y - parentRect.top + 60;
      setPosition({ x: y < 85 ? 85 : y, y: 80 });
    }
  }, []);

  const [, drop] = useDrop(() => ({
    accept: 'box',
    drop: handleDrop,
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const handleClick = React.useCallback(
    (event: React.MouseEvent<any>) => {
      if (!dragTask && dropRef.current) {
        const rect = dropRef.current.getBoundingClientRect();
        const y = event.clientY - rect.top;

        setPosition({ x: y + 85, y: 80 });
      }
      if (currentDay === dragTask) {
        dispatch(activeDragTask(''));
      } else {
        dispatch(activeDragTask(currentDay));
      }
    },
    [currentDay, dispatch, dragTask]
  );

  const hoursOfDay = React.useMemo(() => {
    const hours = [];
    for (let i = 0; i < 24; i++) {
      const hour = moment().utcOffset(0).hour(i);
      hours.push(hour.format('hA'));
    }
    return hours;
  }, []);

  const renderDargTask = React.useMemo(() => {
    if (dragTask === currentDay) {
      return (
        <DraggableBox
          positionX={postionElement.x}
          positionY={postionElement.y}
          heigth={60}
          type="day"
        />
      );
    }
    return null;
  }, [currentDay, dragTask, postionElement.x, postionElement.y]);

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
      <div className={style.wrapper_hours} ref={drop}>
        <div className={style.count_hours}>
          {hoursOfDay.map((el) => (
            <div className={style.hour} key={el}>
              {el}
            </div>
          ))}
        </div>
        {renderDargTask}
        <div className={style.time_fields} ref={dropRef} onClick={handleClick}>
          {hoursOfDay.map((el) => (
            <div className={style.time} key={el}></div>
          ))}
        </div>
      </div>
    </div>
  );
});
