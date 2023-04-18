import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Field } from './field/Field';
import crose from '../../public/images/icons/crose.png';
import eyeOpen from '../../public/images/icons/openEye.png';
import eyeClose from '../../public/images/icons/EyeClosed.png';
import style from './formSingUp.module.scss';
import { Button } from './button/Button';
import {
  isValidConfirmPassword,
  isValidEmail,
  isValidName,
  isValidPassword,
} from '../../utils/validate';

type Props = {
  title: string;
};

export const FormSingUp: React.FC<Props> = ({ title }) => {
  const [name, setName] = useState('');
  const [errorName, setErrorName] = useState('');
  const [email, setEmail] = useState('');
  const [errorEmail, setErrorEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorPassword, setErrorPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorConfirmPassword, setErrorConfirmPassword] = useState('');
  const [openPassword, setOpenPassword] = useState(false);
  const [confirmPasswordOpen, setConfirmPasswordOpen] = useState(false);
  const [validationObj, setValidationObj] = useState({
    name: false,
    email: false,
    password: false,
    confirmPassword: false,
  });

  const onChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
    isValidName(
      event.target.value,
      setErrorName,
      setValidationObj,
      validationObj
    );
  };

  const onChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
    isValidEmail(
      event.target.value,
      setErrorEmail,
      setValidationObj,
      validationObj
    );
  };

  const onChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
    isValidPassword(
      event.target.value,
      setErrorPassword,
      setValidationObj,
      validationObj
    );
  };

  const onChangeConfirmPassword = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmPassword(event.target.value);
    isValidConfirmPassword(
      event.target.value,
      setErrorConfirmPassword,
      setValidationObj,
      validationObj,
      password
    );
  };

  const openPasswordHandler = () => {
    setOpenPassword(!openPassword);
  };

  const openConfirmPasswordHandler = () => {
    setConfirmPasswordOpen(!confirmPasswordOpen);
  };

  const registerUser = () => {
    if (Object.values(validationObj).every((el) => el === true)) {
      setName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
    } else {
      isValidName(name, setErrorName, setValidationObj, validationObj);
      isValidEmail(email, setErrorEmail, setValidationObj, validationObj);
      isValidPassword(
        password,
        setErrorPassword,
        setValidationObj,
        validationObj
      );
      isValidConfirmPassword(
        confirmPassword,
        setErrorConfirmPassword,
        setValidationObj,
        validationObj,
        password
      );
    }
  };

  return (
    <form className={style.wrapper}>
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
        setObjValid={() =>
          setValidationObj({
            ...validationObj,
            name: false,
          })
        }
        error={errorName}
      />
      <Field
        value={email}
        change={onChangeEmail}
        title="Enter email"
        type={'email'}
        placeholder={'account@example.com'}
        setObjValid={() =>
          setValidationObj({
            ...validationObj,
            email: false,
          })
        }
        error={errorEmail}
      />
      <Field
        value={password}
        change={onChangePassword}
        title="Enter password"
        type={!openPassword ? 'password' : 'text'}
        placeholder={'Password'}
        setObjValid={() =>
          setValidationObj({
            ...validationObj,
            password: false,
          })
        }
        error={errorPassword}
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
        setObjValid={() =>
          setValidationObj({
            ...validationObj,
            confirmPassword: false,
          })
        }
        error={errorConfirmPassword}
      >
        <img
          src={confirmPasswordOpen ? eyeOpen : eyeClose}
          alt="close_eye"
          className={style.eye}
          onClick={openConfirmPasswordHandler}
        />
      </Field>
      <Button text="Sing Up" func={registerUser} />
      <div className={style.have_account}>
        Already have no account?
        <Link to="/?sing_in" className={style.sing_in}>
          Sing in
        </Link>
      </div>
    </form>
  );
};
