import moment from 'moment';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  changeDate,
  clearListDates,
} from '../../features/smallCalendar/smallCalendarSlice';
import { chooseTypeCalndar } from '../../features/mainCalendar/mainCalendar';

import left from '../../public/images/icons/arrowLeft.png';
import right from '../../public/images/icons/arrowRight.png';
import style from './header.module.scss';
import classNames from 'classnames';
import { activeDragTask } from '../../features/tecManager/tecManager';

type Props = {
  next: () => void;
  prev: () => void;
};

export const Header: React.FC<Props> = ({ next, prev }) => {
  const currentDate = useAppSelector(
    (state) => state.smallCalendar.currentDate
  );
  const listDate = useAppSelector(
    (state) => state.smallCalendar.listChooseDates
  );
  const typeCalendar = useAppSelector(
    (state) => state.mainCalendar.typeCalendar
  );

  const dispatch = useAppDispatch();

  const prevDate = () => {
    prev();
    dispatch(
      changeDate(
        moment(currentDate).clone().subtract(1, typeCalendar).toISOString()
      )
    );
    dispatch(activeDragTask(''));
    if (
      +moment(currentDate).format('MM') - +moment(listDate[0]).format('MM') ===
      -1
    ) {
      dispatch(clearListDates());
    }
  };

  const nextDate = () => {
    next();
    dispatch(
      changeDate(moment(currentDate).clone().add(1, typeCalendar).toISOString())
    );
    dispatch(activeDragTask(''));
    if (
      +moment(currentDate).format('MM') - +moment(listDate[0]).format('MM') ===
      1
    ) {
      dispatch(clearListDates());
    }
  };

  const setToday = () => {
    dispatch(changeDate(moment().toISOString()));
    dispatch(activeDragTask(''));
  };

  const chooseTypeCalendar = (type: 'day' | 'week' | 'month') => {
    dispatch(chooseTypeCalndar(type));
  };

  return (
    <header className={style.header}>
      <div className={style.info}>
        <div className={style.name}>
          <div className={style.gamburger}>
            <div className={style.line}></div>
          </div>
          <h2>Day.Master</h2>
        </div>
        <div className={style.date}>
          <span>{moment(currentDate).format('MMMM')}</span>
          <span>{moment(currentDate).format('YYYY')}</span>
          <div className={style.switcher}>
            <button type="button" className={style.left} onClick={prevDate}>
              <img src={left} alt="arrowLeft" />
            </button>
            <button type="button" className={style.right} onClick={nextDate}>
              <img src={right} alt="arrowRight" />
            </button>
          </div>
        </div>
      </div>
      <div className={style.days}>
        <button
          className={classNames(style.today, {
            [style['current']]:
              moment().format('DD-MM-YYYY') ===
              moment(currentDate).format('DD-MM-YYYY'),
          })}
          onClick={setToday}
        >
          Today
        </button>
        <div className={style.view_date}>
          <button
            className={classNames(style.view, {
              [style['active']]: typeCalendar === 'day',
            })}
            onClick={() => {
              chooseTypeCalendar('day');
              dispatch(activeDragTask(''));
            }}
          >
            Day
          </button>
          <button
            className={classNames(style.view, {
              [style['active']]: typeCalendar === 'week',
            })}
            onClick={() => {
              dispatch(activeDragTask(''));
              chooseTypeCalendar('week');
            }}
          >
            Week
          </button>
          <button
            className={classNames(style.view, {
              [style['active']]: typeCalendar === 'month',
            })}
            onClick={() => {
              chooseTypeCalendar('week');
              chooseTypeCalendar('month');
            }}
          >
            Month
          </button>
        </div>
      </div>
      <div className={style.user_info}>
        <div className={style.user_avatar}>RF</div>
        <div className={style.user_data}>
          <span>Robert Fox</span>
          <span>robertfox@gmail.com</span>
        </div>
      </div>
    </header>
  );
};
