import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

interface ToastProviderProps {
  children: React.ReactNode;
}

export const ToastProvider = ({ children }: ToastProviderProps) => {

  return (
    <>
      {children}
      <ToastContainer position="top-center" autoClose={3000} />
    </>
  );
}
