import clsx from "clsx";
import { ButtonHTMLAttributes, PropsWithChildren } from "react";

export const Button = ({
  children,
  className = "",
  type = "button",
  ...rest
}: PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>>) => (
  <button
    className={clsx(
      "px-4 py-2 my-4 text-sm font-bold text-white uppercase transition-all duration-150 ease-linear bg-pink-500 rounded shadow outline-none active:bg-pink-600 hover:shadow-md focus:outline-none disabled:bg-gray-500 disabled:cursor-not-allowed",
      className
    )}
    type={type}
    {...rest}
  >
    {children}
  </button>
);
