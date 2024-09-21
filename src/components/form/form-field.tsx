import clsx from "clsx";

import { FormFieldProps, FormFieldVariant } from "./types";

export const FormField: React.FC<FormFieldProps> = ({
  name,
  register,
  error,
  label,
  valueAsNumber,
  variant = FormFieldVariant.Light,
  ...props
}) => {
  const inputClasses = clsx({
    "border-gray-700 bg-gray-900": variant === FormFieldVariant.Dark,
    "border-slate-200": variant === FormFieldVariant.Light,
  });

  return (
    <div className="flex items-center w-full px-2 py-3">
      {label && <label className="pr-2">{label}</label>}
      <div className="flex flex-col w-full">
        <input
          className={clsx("border-b-2  focus:outline-none", inputClasses)}
          {...register(name, { valueAsNumber })}
          {...props}
        />
        {error && (
          <span className="mt-1 text-sm text-red-600 ">{error.message}</span>
        )}
      </div>
    </div>
  );
};
