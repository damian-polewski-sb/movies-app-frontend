import { InputHTMLAttributes } from "react";
import { FieldError, UseFormRegister } from "react-hook-form";

export type FormData = {
  firstName?: string;
  lastName?: string;
  email: string;
  password: string;
  confirmPassword?: string;
};

export type RegisterValidFieldNames =
  | "firstName"
  | "lastName"
  | "email"
  | "password"
  | "confirmPassword";

export type LoginValidFieldNames = "email" | "password";

type ValidFieldNames = RegisterValidFieldNames | LoginValidFieldNames;

export interface FormFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  name: ValidFieldNames;
  register: UseFormRegister<FormData>;
  error: FieldError | undefined;
  valueAsNumber?: boolean;
}
