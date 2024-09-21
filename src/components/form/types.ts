import { InputHTMLAttributes } from "react";
import { FieldError, UseFormRegister } from "react-hook-form";

export type FormData = {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
};

export type RegisterValidFieldNames =
  | "firstName"
  | "lastName"
  | "email"
  | "password"
  | "confirmPassword";

export type LoginValidFieldNames = "email" | "password";

export type EditUserValidFieldNames = "firstName" | "lastName" | "email";

type ValidFieldNames =
  | RegisterValidFieldNames
  | LoginValidFieldNames
  | EditUserValidFieldNames;

export enum FormFieldVariant {
  Light = 'light',
  Dark = 'dark',
}

export interface FormFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  name: ValidFieldNames;
  register: UseFormRegister<FormData>;
  error: FieldError | undefined;
  label?: string;
  valueAsNumber?: boolean;
  variant?: FormFieldVariant;
}
