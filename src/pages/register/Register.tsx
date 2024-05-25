import { Link } from "react-router-dom";

import { RegisterForm } from "./register-form";

export const RegisterPage = () => {
  return (
    <section className="flex items-center justify-center h-screen bg-gray-900">
      <div className="flex flex-row-reverse w-1/2 overflow-hidden bg-white rounded-lg">
        <div className="flex flex-1 bg-center bg-cover bg-register-card-image h-[600px]">
          <div className="flex flex-col justify-center w-full h-full gap-6 p-12 text-white select-none bg-blue-500/20 backdrop-brightness-75">
            <h1 className="text-8xl">Movies App</h1>
            <p>
              It's a place where you can find all the best movies, create list
              of shows you want to watch, share your opinion on the things you
              watch and many more!
            </p>
            <span className="text-sm">Do you have an account?</span>
            <Link to="/login">
              <button className="w-1/2 p-2 font-bold text-gray-900 bg-white border-none cursor-pointer">
                Login
              </button>
            </Link>
          </div>
        </div>
        <div className="flex flex-col justify-center flex-1 gap-6 p-12">
          <h1 className="text-4xl font-bold text-gray-700 text-">Register</h1>
          <RegisterForm />
        </div>
      </div>
    </section>
  );
};
