import clsx from "clsx";

import { InputHTMLAttributes } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

export enum InputVariant {
  Light = "light",
  Dark = "dark",
}

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  variant: InputVariant;
  label: string;
  error: string;
  register?: UseFormRegisterReturn;
}

export const Input = ({
  className = "",
  variant = InputVariant.Light,
  label,
  error,
  register,
  ...props
}: InputProps) => {
  const inputClasses = clsx(className, {
    "border-gray-700 bg-gray-900": variant === InputVariant.Dark,
    "border-slate-200": variant === InputVariant.Light,
  });

  return (
    <div className="flex items-center w-full px-2 py-3">
      {label && <label className="pr-2">{label}</label>}
      <div className="flex flex-col w-full">
        <input
          className={clsx("border-b-2  focus:outline-none", inputClasses)}
          {...register}
          {...props}
        />
        {error && <span className="mt-1 text-sm text-red-600 ">{error}</span>}
      </div>
    </div>
  );
};
