import { PropsWithChildren } from "react";

interface BoxProps {
  label?: string;
  className?: string;
}

export const Box = ({
  label,
  children,
  className = "",
}: PropsWithChildren<BoxProps>) => {
  return (
    <div className="flex flex-col gap-1 text-white">
      <span className="mx-2 font-semibold text-gray-300 text-md">{label}</span>
      <div
        className={`flex flex-col w-full min-w-0 p-4 text-white bg-gray-900 rounded-lg drop-shadow-lg ${className}`}
      >
        {children}
      </div>
    </div>
  );
};
