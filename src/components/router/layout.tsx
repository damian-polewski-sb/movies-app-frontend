import { Outlet } from "react-router-dom";
import { Navbar } from "components/navbar/navbar";

export const Layout = () => {
  return (
    <>
      <Navbar />
      <main className="min-h-[calc(100vh-65px)] bg-gray-800">
        <Outlet />
      </main>
    </>
  );
};
