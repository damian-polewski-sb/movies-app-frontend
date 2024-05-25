import axios from "api/axios";

import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { FormField } from "components/form/form-field";
import { LoginUserSchema } from "components/form/user-schema";
import { FormData } from "components/form/types";
import { AxiosError } from "axios";

const SIGNIN_URL = "/auth/local/signin";

export const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(LoginUserSchema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      const response = await axios.post(
        SIGNIN_URL,
        JSON.stringify({
          email: data.email,
          password: data.password,
        }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      console.log(response.data);
      toast.success("Login successful!");
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        if (err.response?.status === 403) {
          toast.error("Wrong email or password!");
        }
      } else {
        toast.error("Login failed!");
      }
    }
  };

  return (
    <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
      <FormField
        type="text"
        placeholder="E-mail"
        name="email"
        register={register}
        error={errors.email}
      />
      <FormField
        type="password"
        placeholder="Password"
        name="password"
        register={register}
        error={errors.password}
      />
      <button
        type="submit"
        className="w-1/2 p-2 font-bold text-white bg-indigo-900 border-0 cursor-pointer"
      >
        Login
      </button>
    </form>
  );
};
