import { PropsWithChildren } from "react";

interface ContainerProps {
  className?: string;
}

export const Container = ({
  children,
  className = "",
}: PropsWithChildren<ContainerProps>) => {
  return (
    <section className={`flex w-full py-4 mx-auto ${className}`}>
      {children}
    </section>
  );
};
