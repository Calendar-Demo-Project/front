import plus from '../../../../public/images/icons/Plus.png';
import style from './button.module.scss';

export const Button = () => {
  return (
    <button type="button" className={style.button}>
      <img src={plus} alt="plus" />
    </button>
  );
};
