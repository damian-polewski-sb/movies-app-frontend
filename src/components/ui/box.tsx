import { PropsWithChildren } from "react";

interface BoxProps {
  className?: string;
}

export const Box = ({
  children,
  className = "",
}: PropsWithChildren<BoxProps>) => {
  return (
    <div
      className={`flex flex-col w-full min-w-0 px-6 py-4 text-white bg-gray-900 rounded-lg drop-shadow-lg ${className}`}
    >
      {children}
    </div>
  );
};
