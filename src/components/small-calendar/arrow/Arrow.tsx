import { useEffect } from 'react';
import { useAppSelector } from '../../../app/hooks';

export const Arrow = (props: any) => {
  const { style, onClick, url, func, condition, myStyle } = props;
  const selectDate = useAppSelector((state) => state.smallCalendar.selectDate);

  useEffect(() => {
    if (condition && selectDate) {
      func();
      onClick();
    }
  }, [selectDate]);

  return (
    <div
      style={{
        ...style,
        ...myStyle,
      }}
      onClick={() => {
        func();
        onClick();
      }}
    >
      <img src={url} alt="arrow" />
    </div>
  );
};
