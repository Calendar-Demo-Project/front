import classNames from 'classnames';
import { useEffect, useMemo, useState } from 'react';
import { useDrag } from 'react-dnd';

import style from './task.module.scss';

type Props = {
  positionY: number;
  positionX: number;
  heigth: number;
  type: string;
  parent: null | React.MutableRefObject<any>;
};

export const DraggableBox: React.FC<Props> = ({
  positionY,
  positionX,
  heigth,
  type,
  parent,
}) => {
  const positionForDay =
    Math.ceil((Math.round(positionX / 30) * 30) / 10) * 10 - 4.5;
  const positionForWeek = Math.round(positionX / 30) * 30 - 90;

  const [collected, drag] = useDrag({
    type: 'box',
    item: { type: 'box' },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
      clientOffset: monitor.getClientOffset(),
      sourceClientOffset: monitor.getSourceClientOffset(),
    }),
  });
  const [newPositon, setNewPosition] = useState(
    type === 'day' ? positionForDay : positionForWeek
  );

  useEffect(() => {
    setNewPosition(type === 'day' ? positionForDay : positionForWeek);
  }, [positionForDay, positionForWeek, positionX, type]);

  const checkminutesToHours = (minutes: number) => {
    const hours = Math.floor(minutes / 60);

    return hours;
  };

  const renderTime = useMemo(() => {
    const time = `${minutesToHoursAndMinutes(
      type === 'day'
        ? Math.round((Math.round((positionX - 85) / 10) * 10) / 30) * 30
        : Math.round(positionX / 30) * 30 - 90
    )} - ${minutesToHoursAndMinutes(
      (type === 'day'
        ? Math.round((Math.round((positionX - 85) / 10) * 10) / 30) * 30
        : Math.round(positionX / 30) * 30 - 90) + heigth,
      'second'
    )}`;
    if (time === '11:30 PM - 12:30 PM') {
      return '11:00 PM - 12:00 PM';
    }
    if (time === '12:00 PM - 13:00 PM') {
      return '11:00 PM - 12:00 PM';
    }
    return time;
  }, [heigth, positionX, type]);

  useEffect(() => {
    const roundedPosition = Math.round((positionX - 85) / 10);
    const positionForDay = Math.round((roundedPosition * 10) / 30) * 30;

    if (parent) {
      if (checkminutesToHours(positionForDay) > 24) {
        setNewPosition(1440 - (heigth - 85));
      }
      if (
        checkminutesToHours(
          (type === 'day' ? positionForDay : positionForWeek) + heigth
        ) < 0
      ) {
        setNewPosition(0);
      }
      if (newPositon > parent.current.offsetHeight + 26 && type === 'day') {
        setNewPosition(parent.current.offsetHeight + 26);
      }
      if (
        positionForWeek > parent.current.offsetHeight - 61 &&
        type !== 'day'
      ) {
        setNewPosition(parent.current.offsetHeight - 61);
      }
    }
  }, [
    heigth,
    newPositon,
    parent,
    positionForWeek,
    positionX,
    renderTime,
    type,
  ]);

  function minutesToHoursAndMinutes(minutes: number, type?: string) {
    const hours = Math.floor(minutes / 60);
    let remainingMinutes = minutes % 60;
    let formattedHours = hours > 12 ? hours - 12 : hours;
    const amPm = hours >= 12 ? 'PM' : 'AM';
    const formattedTime = `${formattedHours}:${remainingMinutes
      .toString()
      .padStart(2, '0')} ${amPm}`;

    return formattedTime;
  }

  return (
    <div
      ref={drag}
      className={classNames(style.task, {
        active: collected.isDragging,
      })}
      style={{
        height: `${heigth}px`,
        top: newPositon,
        left: positionY,
      }}
    >
      <p className={style.title}>no Title</p>
      <p className={style.time}>{renderTime}</p>
    </div>
  );
};
