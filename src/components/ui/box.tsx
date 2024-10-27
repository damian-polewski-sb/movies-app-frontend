import { PropsWithChildren } from "react";

interface BoxProps {
  label?: string;
  className?: string;
  handleSeeAllClick?: () => void;
}

export const Box = ({
  label,
  children,
  className = "",
  handleSeeAllClick
}: PropsWithChildren<BoxProps>) => {
  return (
    <div className="flex flex-col gap-1 text-white">
      <div className="flex justify-between">
        <span className="mx-2 font-semibold text-gray-300 text-md">
          {label}
        </span>
        {handleSeeAllClick && (
          <span
            className="mx-2 font-semibold text-pink-500 cursor-pointer text-md"
            onClick={handleSeeAllClick}
          >
            See all
          </span>
        )}
      </div>
      <div
        className={`flex flex-col w-full min-w-0 p-4 text-white bg-gray-900 rounded-lg drop-shadow-lg ${className}`}
      >
        {children}
      </div>
    </div>
  );
};
