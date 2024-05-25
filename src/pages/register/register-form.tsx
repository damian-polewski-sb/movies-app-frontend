import { useNavigate } from "react-router-dom";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import axios from "api/axios";

import { FormField } from "components/form/form-field";
import { RegisterUserSchema } from "components/form/user-schema";
import { FormData } from "components/form/types";
import { useAuth } from "hooks/use-auth";

const SIGNUP_URL = "/auth/local/signup";

export const RegisterForm = () => {
  const { setAuth } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(RegisterUserSchema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      const response = await axios.post(
        SIGNUP_URL,
        JSON.stringify({
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          password: data.password,
        }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      const accessToken = response?.data?.accessToken;
      setAuth({ email: data.email, accessToken });
      navigate("/home");
      toast.success("Account created successfully!");
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        if (err.response?.status === 409) {
          toast.error("User with this email already exists!");
        }
      } else {
        toast.error("Registration failed!");
      }
    }
  };

  return (
    <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
      <FormField
        type="text"
        placeholder="First Name"
        name="firstName"
        register={register}
        error={errors.firstName}
      />
      <FormField
        type="text"
        placeholder="Last Name"
        name="lastName"
        register={register}
        error={errors.lastName}
      />
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
      <FormField
        type="password"
        placeholder="Confirm password"
        name="confirmPassword"
        register={register}
        error={errors.confirmPassword}
      />
      <button
        type="submit"
        className="w-1/2 p-2 font-bold text-white bg-indigo-900 border-0 cursor-pointer"
      >
        Register
      </button>
    </form>
  );
};
