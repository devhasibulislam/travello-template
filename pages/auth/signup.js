/**
 * Title: Write a program using JavaScript on Signup
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
import LoadImage from "@/components/shared/image/LoadImage";
import Logo from "@/components/shared/logo/Logo";
import { useSignupMutation } from "@/services/auth/authApi";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";

const Signup = () => {
  const [avatarPreview, setAvatarPreview] = useState(null);
  const { register, handleSubmit, reset } = useForm();
  const [signup, { isLoading, data, error }] = useSignupMutation();
  const router = useRouter();

  useEffect(() => {
    if (data) {
      alert(data?.message);
      router.push("/auth/signin");
    }
    if (error?.data) {
      alert(error?.data?.message);
    }
    if (isLoading) {
      setAvatarPreview(null);
      reset();
    }
  }, [data, error, isLoading, reset, router]);

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];

    if (!avatarPreview) {
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setAvatarPreview(reader.result);
        };

        reader.readAsDataURL(file);
      }
    }
  };

  const handleSignup = (data) => {
    const formData = new FormData();

    formData.append("avatar", data.avatar[0]);
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("phone", data.phone);

    signup(formData);
  };

  return (
    <section className="min-w-full min-h-screen flex justify-center items-center p-4">
      <div className="max-w-md w-full flex flex-col gap-y-4 border p-8 rounded-primary">
        <div className="flex flex-row items-center gap-x-2">
          <hr className="w-full" />
          <Logo />
          <hr className="w-full" />
        </div>
        <form
          action=""
          className="w-full flex flex-col gap-y-4"
          onSubmit={handleSubmit(handleSignup)}
        >
          <label
            htmlFor="avatar"
            className="flex flex-col gap-y-1 w-fit mx-auto items-center"
          >
            <span className="text-sm">Upload 300x300 Avatar</span>
            <div
              className={
                "h-[100px] w-[100px] rounded transition-colors flex flex-row justify-center items-center relative" +
                " " +
                (avatarPreview
                  ? ""
                  : "border-2 border-dashed hover:border-black")
              }
            >
              {avatarPreview ? (
                <div className="relative">
                  <LoadImage
                    src={avatarPreview}
                    alt="avatar"
                    height={100}
                    width={100}
                    className="rounded h-[100px] w-[100px] object-cover"
                  />
                  <button
                    className="absolute bottom-0 -right-10 p-1 rounded bg-red-500 text-white shadow-2xl"
                    onClick={() => setAvatarPreview(null)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                      />
                    </svg>
                  </button>
                </div>
              ) : (
                <>
                  <span className="text-xs flex flex-col justify-center items-center gap-y-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                      />
                    </svg>
                    Add Avatar
                  </span>

                  <input
                    type="file"
                    name="avatar"
                    id="avatar"
                    title="Dimension: 300x300"
                    accept="image/jpg, image/png, image/jpeg"
                    {...register("avatar", {
                      required: true,
                      onChange: (event) => handleAvatarChange(event),
                    })}
                    className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                  />
                </>
              )}
            </div>
          </label>
          <label htmlFor="name" className="flex flex-col gap-y-1">
            <span className="text-sm">Enter Your Name</span>
            <input
              type="text"
              name="name"
              id="name"
              {...register("name", { required: true })}
              placeholder="i.e. Hasibul Islam"
              className=""
            />
          </label>
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
          <label htmlFor="phone" className="flex flex-col gap-y-1">
            <span className="text-sm">Enter Your Phone Number</span>
            <input
              type="tel"
              name="phone"
              id="phone"
              {...register("phone", { required: true })}
              placeholder="i.e. +8801906315901"
              className=""
            />
          </label>
          <Button type="submit" disabled={isLoading} className="py-2">
            {isLoading ? "Loading..." : "Sign Up"}
          </Button>
        </form>
        <div className="text-xs flex flex-row justify-center items-center gap-x-2">
          <Link href="/auth/forgot-password">Forgot Password</Link>
          <div className="h-4 border-l"></div>
          <Link href="/auth/signin">Sign In</Link>
        </div>
      </div>
    </section>
  );
};

export default Signup;

/**
 * How to Multipart File Upload Using FormData with React Hook Form
 * https://refine.dev/blog/how-to-multipart-file-upload-with-react-hook-form/
 *
 * React hook form: How to can I use onChange on React Hook Form Version 7.0
 * https://stackoverflow.com/questions/66936135/react-hook-form-how-to-can-i-use-onchange-on-react-hook-form-version-7-0
 *
 * API resolved without sending a response in Next.Js
 * https://stackoverflow.com/questions/60684227/api-resolved-without-sending-a-response-in-nextjs
 */
