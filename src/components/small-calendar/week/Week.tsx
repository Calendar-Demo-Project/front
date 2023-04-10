import style from './week.module.scss';

export const Week = () => {
  const week = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  return (
    <div className={style.wrapper}>
      {week.map((el: string) => (
        <div className={style.day} key={el}>
          {el}
        </div>
      ))}
    </div>
  );
};
