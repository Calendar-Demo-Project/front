import { useState } from 'react';
import { Field } from './components/field/Field';
import crose from '../../public/images/icons/crose.png';

import style from './formSingIn.module.scss';
import { Link } from 'react-router-dom';
import { Button } from './components/button/Button';

type Props = {
  title: string;
  type: 'enter' | 'restore';
};

export const FormSingIn: React.FC<Props> = ({ title, type }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [validationObj, setValidationObj] = useState({
    email: false,
    password: false,
  });

  const onChangeEmail = (
    event: React.ChangeEvent<HTMLInputElement>,
    func: (value?: string) => void
  ) => {
    setEmail(event.currentTarget.value);
    if (!event.currentTarget.value.length) {
      setValidationObj({
        ...validationObj,
        email: false,
      });
      return func("field shouldn't be empty");
    }
    setValidationObj({
      ...validationObj,
      email: true,
    });
    return func('');
  };

  const onChangePassword = (
    event: React.ChangeEvent<HTMLInputElement>,
    func: (value?: string) => void
  ) => {
    setPassword(event.currentTarget.value);
    if (!event.currentTarget.value.length) {
      setValidationObj({
        ...validationObj,
        password: false,
      });
      return func("field shouldn't be empty");
    }
    setValidationObj({
      ...validationObj,
      password: true,
    });
    return func('');
  };

  return (
    <div className={style.wrapper}>
      <div className={style.wrapper_title}>
        <h3 className={style.title}>{title}</h3>
        <Link to="/">
          <img src={crose} alt="close" />
        </Link>
      </div>
      {type === 'enter' && (
        <>
          <Field
            value={email}
            change={onChangeEmail}
            type="email"
            title="Enter email"
            placeholder="account@example.com"
          />
          <Field
            value={password}
            change={onChangePassword}
            type="password"
            title="Enter password"
            placeholder="Password"
          />
          <Link to={'?forgot_password'} className={style.forgot_password}>
            Forgot Password?
          </Link>
          <Button text="Sing in" func={() => {}} />
          <div className={style.have_account}>
            Already have no account?
            <Link to="/?sing_up" className={style.sing_up}>
              Sing up
            </Link>
          </div>
        </>
      )}
      {type === 'restore' && (
        <>
          <>
            <p className={style.text}>
              Please enter your email to receive instructions on how to reset
              your password
            </p>
            <Field
              value={email}
              change={onChangeEmail}
              type="email"
              title="Enter email"
              placeholder="account@example.com"
            />
            <Button text="Send" func={() => {}} />
            <Link to="/?sing_in" type="button" className={style.remember}>
              I remembered my password
            </Link>
          </>
        </>
      )}
    </div>
  );
};
