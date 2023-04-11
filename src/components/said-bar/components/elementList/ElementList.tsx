import classNames from 'classnames';
import { useState } from 'react';

import { v4 as uuidv4 } from 'uuid';

import style from './elementList.module.scss';

type Props = {
  type: string;
  text: string;
  active?: boolean;
  color: string;
};

export const ElementList: React.FC<Props> = ({ type, text, active, color }) => {
  const [isChecked, setIsChecked] = useState(active);
  const id = uuidv4();
  function handleCheckboxChange(event: React.ChangeEvent<HTMLInputElement>) {
    setIsChecked(event.target.checked);
  }

  return (
    <div className={style.wrapper}>
      {(type === 'task' || type === 'event') && (
        <>
          <input
            id={id}
            type="checkbox"
            className={style.input}
            checked={isChecked}
            onChange={handleCheckboxChange}
          />
          <label
            className={classNames(style.checkbox, {
              [style['active']]: isChecked,
            })}
            style={{ backgroundColor: `${color}` }}
            htmlFor={id}
          ></label>
        </>
      )}
      {type === 'category' && (
        <>
          <div
            className={style.circul}
            style={{ backgroundColor: `${color}` }}
          ></div>
        </>
      )}
      <span
        className={classNames(style.text, {
          [style['done']]: isChecked,
        })}
      >
        {text}
      </span>
    </div>
  );
};
