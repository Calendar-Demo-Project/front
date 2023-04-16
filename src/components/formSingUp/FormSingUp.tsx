import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Field } from './field/Field';
import crose from '../../public/images/icons/crose.png';
import eyeOpen from '../../public/images/icons/openEye.png';
import eyeClose from '../../public/images/icons/EyeClosed.png';
import style from './formSingUp.module.scss';
import { Button } from './button/Button';

type Props = {
  title: string;
};

export const FormSingUp: React.FC<Props> = ({ title }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [openPassword, setOpenPassword] = useState(false);
  const [confirmPasswordOpen, setConfirmPasswordOpen] = useState(false);
  const [validationObj, setValidationObj] = useState({
    name: false,
    email: false,
    password: false,
    confirmPassword: false,
  });

  const isValidName = (value: string, func: (value?: string) => void) => {
    if (value.length < 3 || value.length > 40) {
      setValidationObj({
        ...validationObj,
        name: false,
      });
      return func('Min 3 symbols and max 40 symbols');
    }
    if (!/^[A-Za-z0-9]+$/.test(value)) {
      return func('Allow only latin and digits');
    }
    setValidationObj({
      ...validationObj,
      name: true,
    });
    return func('');
  };

  const isValidEmail = (value: string, func: (value?: string) => void) => {
    if (!value.length || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      setValidationObj({
        ...validationObj,
        email: false,
      });
      return func('Not valid email');
    }
    setValidationObj({
      ...validationObj,
      email: true,
    });
    return func('');
  };

  const isValidPassword = (value: string, func: (value?: string) => void) => {
    if (!/^(?=.*\d)(?=.*[A-Z])(?=.*[!@#$%^&*])(?!.*\s).{8,30}$/.test(value)) {
      setValidationObj({
        ...validationObj,
        password: false,
      });
      return func(
        'Password should contain one digit one special character and capital letter'
      );
    }
    setValidationObj({
      ...validationObj,
      password: true,
    });
    return func('');
  };

  const isValidConfirmPassword = (
    value: string,
    func: (value?: string) => void
  ) => {
    if (value !== password) {
      setValidationObj({
        ...validationObj,
        confirmPassword: false,
      });
      return func('Passwords must match');
    }
    setValidationObj({
      ...validationObj,
      confirmPassword: true,
    });
    return func('');
  };

  const onChangeName = (
    event: React.ChangeEvent<HTMLInputElement>,
    func: (value?: string) => void
  ) => {
    setName(event.target.value);
    isValidName(event.target.value, func);
  };

  const onChangeEmail = (
    event: React.ChangeEvent<HTMLInputElement>,
    func: (value?: string) => void
  ) => {
    setEmail(event.target.value);
    isValidEmail(event.target.value, func);
  };

  const onChangePassword = (
    event: React.ChangeEvent<HTMLInputElement>,
    func: (value?: string) => void
  ) => {
    setPassword(event.target.value);
    isValidPassword(event.target.value, func);
  };

  const onChangeConfirmPassword = (
    event: React.ChangeEvent<HTMLInputElement>,
    func: (value?: string) => void
  ) => {
    setConfirmPassword(event.target.value);
    isValidConfirmPassword(event.target.value, func);
  };

  const openPasswordHandler = () => {
    setOpenPassword(!openPassword);
  };

  const openConfirmPasswordHandler = () => {
    setConfirmPasswordOpen(!confirmPasswordOpen);
  };

  return (
    <div className={style.wrapper}>
      <div className={style.wrapper_title}>
        <h3 className={style.title}>{title}</h3>
        <Link to="/">
          <img src={crose} alt="close" />
        </Link>
      </div>
      <Field
        value={name}
        change={onChangeName}
        title="Enter name"
        type={'text'}
        placeholder={'John Doe'}
      />
      <Field
        value={email}
        change={onChangeEmail}
        title="Enter email"
        type={'email'}
        placeholder={'account@example.com'}
      />
      <Field
        value={password}
        change={onChangePassword}
        title="Enter password"
        type={!openPassword ? 'password' : 'text'}
        placeholder={'Password'}
      >
        <img
          src={openPassword ? eyeOpen : eyeClose}
          alt="close_eye"
          className={style.eye}
          onClick={openPasswordHandler}
        />
      </Field>
      <Field
        value={confirmPassword}
        change={onChangeConfirmPassword}
        title="Confirm password"
        type={!confirmPasswordOpen ? 'password' : 'text'}
        placeholder={'Password'}
      >
        <img
          src={confirmPasswordOpen ? eyeOpen : eyeClose}
          alt="close_eye"
          className={style.eye}
          onClick={openConfirmPasswordHandler}
        />
      </Field>
      <Button text="Sing Up" func={() => {}} />
      <div className={style.have_account}>
        Already have no account?
        <Link to="/?sing_in" className={style.sing_in}>
          Sing in
        </Link>
      </div>
    </div>
  );
};
