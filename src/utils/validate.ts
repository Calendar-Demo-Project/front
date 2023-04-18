import { validateObject } from '../types/validateType';

export const validEmail = (value: string) =>
  !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

export const validPassword = (value: string) =>
  !/^(?=.*\d)(?=.*[A-Z])(?=.*[!@#$%^&*])(?!.*\s).{8,30}$/.test(value);

export const isValidName = (
  value: string,
  func: (value: string) => void,
  setValidationObj: (obj: validateObject) => void,
  validationObj: validateObject
) => {
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

export const isValidEmail = (
  value: string,
  func: (value: string) => void,
  setValidationObj: (obj: validateObject) => void,
  validationObj: validateObject
) => {
  if (validEmail(value)) {
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

export const isValidPassword = (
  value: string,
  func: (value: string) => void,
  setValidationObj: (obj: validateObject) => void,
  validationObj: validateObject
) => {
  if (validPassword(value)) {
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

export const isValidConfirmPassword = (
  value: string,
  func: (value: string) => void,
  setValidationObj: (obj: validateObject) => void,
  validationObj: validateObject,
  password: string
) => {
  if (value !== password || !value.length) {
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
