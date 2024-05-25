import { Outlet } from "react-router-dom";
import { Navbar } from "components/navbar/navbar";

export const Layout = () => {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-800">
        <Outlet />
      </main>
    </>
  );
};
