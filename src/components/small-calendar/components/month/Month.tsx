import style from './month.module.scss';
import React from 'react';

type Props = {
  children: JSX.Element[];
  handlerOnMouseUp: () => void;
  handleOnMouseLeave: () => void;
};

export const Month: React.FC<Props> = React.memo(
  ({ children, handlerOnMouseUp, handleOnMouseLeave }) => {
    return (
      <div
        className={style.month}
        onMouseUp={handlerOnMouseUp}
        onMouseLeave={handleOnMouseLeave}
      >
        {children}
      </div>
    );
  }
);
