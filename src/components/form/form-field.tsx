import { FormFieldProps } from "./types";

export const FormField: React.FC<FormFieldProps> = ({
  name,
  register,
  error,
  valueAsNumber,
  ...props
}) => (
  <div className="flex flex-col px-2 py-3">
    <input
      className="border-b-2 border-slate-200 focus:outline-none"
      {...register(name, { valueAsNumber })}
      {...props}
    />
    {error && <span className="mt-1 text-sm text-red-600 ">{error.message}</span>}
  </div>
);
