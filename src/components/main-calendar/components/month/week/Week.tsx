import style from './week.module.scss';

export const WeekMonth = () => {
  const week = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  return (
    <div className={style.wrapper}>
      {week.map((el) => {
        return (
          <div className={style.day_name} key={el}>
            {el}
          </div>
        );
      })}
    </div>
  );
};
