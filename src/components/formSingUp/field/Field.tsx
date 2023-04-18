import style from './field.module.scss';

type Props = {
  value: string;
  change: (event: React.ChangeEvent<HTMLInputElement>) => void;
  type: string;
  title: string;
  placeholder: string;
  children?: React.ReactNode;
  setObjValid: () => void;
  error: string;
};

export const Field: React.FC<Props> = ({
  value,
  change,
  type,
  title,
  placeholder,
  children,
  error,
}) => {
  return (
    <label className={style.wrapper}>
      <h2 className={style.title}>{title}</h2>
      <input
        value={value}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          change(event);
        }}
        type={type}
        className={style.field}
        placeholder={placeholder}
      />
      {children}
      <span className={style.error}>{error}</span>
    </label>
  );
};
