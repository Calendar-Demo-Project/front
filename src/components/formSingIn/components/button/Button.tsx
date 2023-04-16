import style from './button.module.scss';

type Props = {
  text: string;
  func: () => void;
};

export const Button: React.FC<Props> = ({ text, func }) => {
  return (
    <button type="button" onClick={func} className={style.button}>
      {text}
    </button>
  );
};
