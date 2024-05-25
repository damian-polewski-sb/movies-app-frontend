import { Link } from "react-router-dom";
import { LoginForm } from "./login-form";

export const LoginPage = () => {
  return (
    <section className="flex items-center justify-center h-screen bg-gray-900">
      <div className="flex w-1/2 overflow-hidden bg-white rounded-lg">
        <div className="flex flex-1 bg-center bg-cover bg-login-card-image h-[600px]">
          <div className="flex flex-col justify-center w-full h-full gap-6 p-12 text-white select-none bg-blue-500/20 backdrop-brightness-75">
            <h1 className="text-8xl">Movies App</h1>
            <p>
              It's a place where you can find all the best movies, create list
              of shows you want to watch, share your opinion on the things you
              watch and many more!
            </p>
            <span className="text-sm">Don't have an account?</span>
            <Link to="/register">
              <button className="w-1/2 p-2 font-bold text-gray-900 bg-white border-none cursor-pointer">
                Register
              </button>
            </Link>
          </div>
        </div>
        <div className="flex flex-col justify-center flex-1 gap-6 p-12">
          <h1 className="text-4xl font-bold text-gray-700 text-">Login</h1>
          <LoginForm />
        </div>
      </div>
    </section>
  );
};
