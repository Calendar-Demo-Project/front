import classNames from 'classnames';
import { useState } from 'react';
import arrow from '../../../../public/images/icons/openClosedArrow.png';
import { ICategory, IEvent, ITask } from '../../../../types/elementList';
import { Button } from '../button/Button';
import { ElementList } from '../elementList/ElementList';

import style from './acardion.module.scss';

type Props = {
  title: string;
  list?: IEvent[] | ITask[] | ICategory[];
};

export const Acardion: React.FC<Props> = ({ title, list }) => {
  const [active, setActive] = useState(false);

  const showContent = () => {
    setActive((active) => !active);
  };

  const isActive = (obj: ITask | IEvent | ICategory) => {
    if ('active' in obj) {
      return obj.active;
    }

    return false;
  };

  return (
    <div className={style.acardion}>
      <div className={style.title} onClick={showContent}>
        <h3>{title}</h3>
        <img
          src={arrow}
          alt="arrow"
          className={classNames(style.default, {
            [style['down']]: active,
          })}
        />
      </div>
      <div
        className={classNames(style.content, {
          [style['active']]: active,
        })}
      >
        {list &&
          list.map((el: ITask | IEvent | ICategory) => {
            return (
              <ElementList
                type={el.type}
                text={el.text}
                active={isActive(el)}
                color={el.color}
                key={Math.random() * (99999 - 1) + 1}
              />
            );
          })}
        <Button text={title} />
      </div>
    </div>
  );
};
