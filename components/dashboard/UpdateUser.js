/**
 * Title: Write a program using JavaScript on UpdateUser
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
 * Date: 17, November 2023
 */

import { useUpdateUserMutation } from "@/services/user/userApi";
import React, { useEffect, useState } from "react";
import Button from "../shared/button/Button";
import LoadImage from "../shared/image/LoadImage";
import { useForm } from "react-hook-form";
import { GrCloudUpload } from "react-icons/gr";
import { useSelector } from "react-redux";

const UpdateUser = () => {
  const user = useSelector((state) => state?.auth);
  const [
    updateInformation,
    {
      isLoading: updatingUserData,
      data: updatedUserData,
      error: updatedUserDataError,
    },
  ] = useUpdateUserMutation();

  useEffect(() => {
    if (updatedUserData) {
      alert(updatedUserData?.message);
    }
    if (updatedUserDataError?.data) {
      alert(updatedUserDataError?.data?.message);
    }
  }, [updatedUserData, updatedUserDataError]);

  const [avatarPreview, setAvatarPreview] = useState(null);
  const { register, handleSubmit } = useForm({
    defaultValues: {
      name: user?.name,
      email: user?.email,
      phone: user?.phone,
      avatar: user?.avatar,
      role: user?.role,
    },
  });

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

  const handleUpdateUser = (data) => {
    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("role", data.role);
    formData.append("phone", data.phone);

    if (avatarPreview) {
      formData.append("avatar", data.avatar[0]);
      formData.append("oldAvatar", user?.avatar?.public_id);
    }

    updateInformation({ id: user?._id, body: formData });
  };

  return (
    <form
      action=""
      className="w-full flex flex-col gap-y-4"
      onSubmit={handleSubmit(handleUpdateUser)}
    >
      <label
        htmlFor="avatar"
        className="flex flex-col gap-y-1 w-fit mx-auto items-center"
      >
        <span className="text-sm">Upload 300x300 Avatar</span>
        {(avatarPreview || user?.avatar?.url) && (
          <div className="relative h-[100px] w-[100px]">
            <LoadImage
              src={avatarPreview || user?.avatar?.url}
              alt={user?.avatar?.public_id || "avatar"}
              height={100}
              width={100}
              className="rounded h-[100px] w-[100px] object-cover"
            />
            <div className="absolute top-1 right-1 w-8 h-8 border rounded-secondary bg-primary">
              <div className="relative flex justify-center items-center w-full h-full">
                <span className="rounded-secondary">
                  <GrCloudUpload className="h-5 w-5" />
                  <input
                    type="file"
                    name="avatar"
                    id="avatar"
                    title="Dimension: 300x300"
                    accept="image/jpg, image/png, image/jpeg"
                    {...register("avatar", {
                      onChange: (event) => handleAvatarChange(event),
                    })}
                    className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                  />
                </span>
              </div>
            </div>
          </div>
        )}
      </label>
      <label htmlFor="name" className="flex flex-col gap-y-1">
        <span className="text-sm">Modify Your Name</span>
        <input
          type="text"
          name="name"
          id="name"
          {...register("name")}
          placeholder="i.e. Hasibul Islam"
          className=""
        />
      </label>
      <label htmlFor="email" className="flex flex-col gap-y-1">
        <span className="text-sm">Modify Your Email</span>
        <input
          type="email"
          name="email"
          id="email"
          {...register("email")}
          placeholder="i.e. devhasibulislam@gmail.com"
          className=""
        />
      </label>
      <label htmlFor="role" className="flex flex-col gap-y-1">
        <span className="text-sm">Modify Your Role</span>
        <select name="role" id="role" {...register("role")} className="">
          <option value="seller">Seller</option>
          <option value="buyer">Buyer</option>
        </select>
      </label>
      <label htmlFor="phone" className="flex flex-col gap-y-1">
        <span className="text-sm">Modify Your Phone Number</span>
        <input
          type="tel"
          name="phone"
          id="phone"
          {...register("phone")}
          placeholder="i.e. +8801906315901"
          className=""
        />
      </label>
      <Button type="submit" disabled={updatingUserData} className="py-2">
        {updatingUserData ? "Loading..." : "Update Profile"}
      </Button>
    </form>
  );
};

export default UpdateUser;
