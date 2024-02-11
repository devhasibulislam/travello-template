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
import { toast } from "react-hot-toast";

const UpdateUser = ({ setIsOpen }) => {
  const [avatarPreview, setAvatarPreview] = useState(null);
  const user = useSelector((state) => state?.user);
  const [updateUser, { isLoading, data, error }] = useUpdateUserMutation();

  useEffect(() => {
    if (isLoading) {
      toast.loading("Updating User Information...", {
        id: "updateUser",
      });
    }

    if (data) {
      toast.success(data?.message, { id: "updateUser" });
      setIsOpen(false);
    }

    if (error?.data) {
      toast.error(error?.data?.message, {
        id: "updateUser",
      });
    }
  }, [data, error, isLoading, setIsOpen]);

  const { register, handleSubmit } = useForm({
    defaultValues: {
      name: user?.name,
      email: user?.email,
      phone: user?.phone,
      avatar: user?.avatar,
      address: user?.address,
      role: user?.role,
      status: user?.status,
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
    formData.append("phone", data.phone);
    formData.append("role", data.role);
    formData.append("status", data.status);
    formData.append("address", data.address);

    if (avatarPreview !== null && data.avatar[0]) {
      formData.append("avatar", data.avatar[0]);
    }

    updateUser({ id: user?._id, body: formData });
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
                <span className="rounded-secondary text-white">
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
        <span className="text-sm">Modify Name</span>
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
        <span className="text-sm">Modify Email</span>
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
        <span className="text-sm">Modify Role</span>
        <select name="role" id="role" {...register("role")} className="">
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
      </label>

      <label htmlFor="status" className="flex flex-col gap-y-1">
        <span className="text-sm">Modify Status</span>
        <select name="status" id="status" {...register("status")} className="">
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </label>

      <label htmlFor="phone" className="flex flex-col gap-y-1">
        <span className="text-sm">Modify Phone Number</span>
        <input
          type="tel"
          name="phone"
          id="phone"
          {...register("phone")}
          placeholder="i.e. +8801906315901"
          className=""
        />
      </label>

      <label htmlFor="address" className="flex flex-col gap-y-1">
        <span className="text-sm">Modify Address*</span>
        <textarea
          name="address"
          id="address"
          rows="2"
          maxLength={500}
          placeholder="Type your address here..."
          className="rounded"
          {...register("address", { required: true })}
        ></textarea>
      </label>

      <Button type="submit" disabled={isLoading} className="py-2">
        {isLoading ? "Loading..." : "Update Profile"}
      </Button>
    </form>
  );
};

export default UpdateUser;
