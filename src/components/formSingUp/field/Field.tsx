import { useState } from 'react';
import style from './field.module.scss';

type Props = {
  value: string;
  change: (event: React.ChangeEvent<HTMLInputElement>, func: any) => void;
  type: string;
  title: string;
  placeholder: string;
  children?: React.ReactNode;
};

export const Field: React.FC<Props> = ({
  value,
  change,
  type,
  title,
  placeholder,
  children,
}) => {
  const [error, setError] = useState('');

  return (
    <label className={style.wrapper}>
      <h2 className={style.title}>{title}</h2>
      <input
        value={value}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          change(event, setError);
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
