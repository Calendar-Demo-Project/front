import plus from '../../../../public/images/icons/Plus.png';
import style from './button.module.scss';

type Props = {
  text: string;
};

export const Button: React.FC<Props> = ({ text }) => {
  return (
    <button type="button" className={style.button}>
      <img src={plus} alt="plus" />
      {`Add ${text}`}
    </button>
  );
};
