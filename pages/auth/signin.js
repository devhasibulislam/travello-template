/**
 * Title: Write a program using JavaScript on Signin
 * Author: Hasibul Islam
 * Portfolio: https://devhasibulislam.vercel.app
 * Linkedin: https://linkedin.com/in/devhasibulislam
 * GitHub: https://github.com/devhasibulislam
 * Facebook: https://facebook.com/devhasibulislam
 * Instagram: https://instagram.com/devhasibulislam
 * Twitter: https://twitter.com/devhasibulislam
 * Pinterest: https://pinterest.com/devhasibulislam
 * WhatsApp: https://wa.me/8801906315901
 * Telegram: devhasibulislam
 * Date: 08, November 2023
 */

import Button from "@/components/shared/button/Button";
import Logo from "@/components/shared/logo/Logo";
import { useSigninMutation } from "@/services/auth/authApi";
import Link from "next/link";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

const Signin = () => {
  const { register, handleSubmit, reset } = useForm();
  const [signin, { isLoading, data, error }] = useSigninMutation();

  useEffect(() => {
    if (data) {
      toast.success(data?.message, { id: "signin" });
      if (data?.accessToken) {
        localStorage.setItem("accessToken", data?.accessToken);
        window.open("/", "_self");
      }
      reset();
    }
    if (error?.data) {
      toast.error(error?.data?.message, { id: "signin" });
    }
    if (isLoading) {
      toast.loading("Signing in...", { id: "signin" });
    }
  }, [data, error, isLoading, reset]);

  const handleSignin = (data) => {
    signin(data);
  };

  return (
    <section className="w-screen h-screen flex justify-center items-center px-4">
      <div className="max-w-md w-full flex flex-col gap-y-4 border p-8 rounded-primary">
        <div className="flex flex-row items-center gap-x-2">
          <hr className="w-full" />
          <Logo />
          <hr className="w-full" />
        </div>
        <form
          action=""
          className="w-full flex flex-col gap-y-4"
          onSubmit={handleSubmit(handleSignin)}
        >
          <label htmlFor="email" className="flex flex-col gap-y-1">
            <span className="text-sm">Enter Your Email</span>
            <input
              type="email"
              name="email"
              id="email"
              {...register("email", { required: true })}
              placeholder="i.e. devhasibulislam@gmail.com"
              className=""
            />
          </label>
          <label htmlFor="password" className="flex flex-col gap-y-1">
            <span className="text-sm">Enter Your Password</span>
            <input
              type="password"
              name="password"
              id="password"
              {...register("password", { required: true })}
              placeholder="i.e. Hasib@123"
              className=""
            />
          </label>
          <Button type="submit" disabled={isLoading} className="py-2">
            Sign in
          </Button>
        </form>
        <div className="text-xs flex flex-row justify-center items-center gap-x-2">
          <Link href="/auth/signup">Sign Up</Link>
          <div className="h-4 border-l"></div>
          <Link href="/auth/forgot-password">Forgot Password</Link>
        </div>
      </div>
    </section>
  );
};

export default Signin;
