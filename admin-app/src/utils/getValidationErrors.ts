import { ValidationError } from 'yup';

export interface IError {
  [key: string]: string;
}

export default function getValidationErrors(err: ValidationError): IError {
  const validationErrors: IError = {};

  err.inner.forEach((error) => {
    validationErrors[error.path] = error.message;
  });

  return validationErrors;
}
