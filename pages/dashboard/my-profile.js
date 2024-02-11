/**
 * Title: Write a program using JavaScript on My-profile
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
 * Date: 31, January 2024
 */

import Button from "@/components/shared/button/Button";
import LoadImage from "@/components/shared/image/LoadImage";
import Modal from "@/components/shared/modal/Modal";
import { setUser } from "@/features/user/userSlice";
import Panel from "@/layouts/Panel";
import {
  useDeleteUserMutation,
  useGetUserQuery,
  useUpdateUserMutation,
} from "@/services/user/userApi";
import React, { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { AiOutlineDelete } from "react-icons/ai";
import { IoCloudUploadOutline } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { CiWarning } from "react-icons/ci";
import {
  MdDeleteOutline,
  MdFavoriteBorder,
  MdOutlineReviews,
  MdWarningAmber,
} from "react-icons/md";
import { LuShoppingCart } from "react-icons/lu";
import { BiSolidPurchaseTag } from "react-icons/bi";
import { TbDoorEnter } from "react-icons/tb";

const MyProfile = () => {
  const user = useSelector((state) => state?.auth);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [updateUser, { isLoading, data, error }] = useUpdateUserMutation();

  const defaultValues = useMemo(() => {
    return {
      name: user?.name,
      email: user?.email,
      phone: user?.phone,
      avatar: user?.avatar,
      address: user?.address,
    };
  }, [user]);
  const { register, handleSubmit, reset } = useForm({ defaultValues });

  useEffect(() => {
    reset(defaultValues);

    if (isLoading) {
      toast.loading("Updating User Information...", { id: "updateUser" });
    }

    if (data) {
      toast.success(data?.message, { id: "updateUser" });
    }

    if (error?.data) {
      toast.error(error?.data?.message, { id: "updateUser" });
    }
  }, [defaultValues, reset, data, error, isLoading]);

  const handleAvatarPreview = (e) => {
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
    formData.append("address", data.address);

    if (avatarPreview !== null && data.avatar[0]) {
      formData.append("avatar", data.avatar[0]);
    }

    updateUser({ id: user?._id, body: formData });
  };

  return (
    <>
      <Panel>
        <form
          action=""
          className="text-sm lg:w-1/2 md:w-3/4 w-full flex flex-col gap-y-4"
          onSubmit={handleSubmit(handleUpdateUser)}
        >
          {/* avatar */}
          <div className="flex flex-col gap-y-2 w-fit">
            <LoadImage
              src={avatarPreview || defaultValues?.avatar?.url}
              alt={defaultValues?.avatar?.public_id || "avatar"}
              height={100}
              width={100}
              className="h-[100px] w-[100px] rounded object-cover"
            />
            <label htmlFor="avatar" className="relative">
              <button
                type="button"
                className="py-1 px-4 flex flex-row gap-x-2 bg-green-100 border border-green-900 text-green-900 rounded-secondary w-fit"
              >
                <IoCloudUploadOutline className="h-5 w-5" />
                Edit Your Avatar
              </button>
              <input
                type="file"
                name="avatar"
                id="avatar"
                accept="image/png, image/jpg, image/jpeg"
                className="absolute top-0 left-0 h-full w-full opacity-0 cursor-pointer"
                {...register("avatar", {
                  onChange: (event) => handleAvatarPreview(event),
                })}
              />
            </label>
          </div>

          <label htmlFor="name" className="flex flex-col gap-y-1">
            <span className="text-sm">Your Name</span>
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
            <span className="text-sm">Your Email</span>
            <input
              type="email"
              name="email"
              id="email"
              {...register("email")}
              placeholder="i.e. devhasibulislam@gmail.com"
              className=""
            />
          </label>

          <label htmlFor="phone" className="flex flex-col gap-y-1">
            <span className="text-sm">Your Phone Number</span>
            <input
              type="tel"
              name="phone"
              id="phone"
              {...register("phone")}
              placeholder="i.e. +8801906315901"
              className=""
            />
          </label>

          <label htmlFor="address" className="flex flex-col gap-y-2">
            Your Address*
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

          <Button type="submit" className="py-2 mt-4">
            Update Information
          </Button>
        </form>
        <RemoveInformation id={user?._id} />
      </Panel>
    </>
  );
};

function RemoveInformation({ id }) {
  const [isOpen, setIsOpen] = useState(false);
  const {
    isLoading: fetching,
    data: fetchData,
    error: fetchError,
  } = useGetUserQuery(id);
  const user = useMemo(() => fetchData?.data || {}, [fetchData]);
  const [
    deleteUser,
    { isLoading: deleting, data: deleteData, error: deleteError },
  ] = useDeleteUserMutation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (fetching) {
      toast.loading("Updating User Information...", {
        id: "fetchUser",
      });
    }

    if (fetchData) {
      toast.success(fetchData?.message, { id: "fetchUser" });
    }

    if (fetchError?.data) {
      toast.error(fetchError?.data?.message, { id: "fetchUser" });
    }

    if (deleting) {
      toast.loading("Deleting User...", { id: "deleteUser" });
    }

    if (deleteData) {
      toast.success(deleteData?.message, { id: "deleteUser" });
      setIsOpen(false);
      window.open("/", "_self");
    }

    if (deleteError?.data) {
      toast.error(deleteError?.data?.message, { id: "deleteUser" });
    }
  }, [fetching, fetchData, fetchError, deleting, deleteData, deleteError]);

  return (
    <>
      <Button
        type="submit"
        className="py-2 mt-4 lg:w-1/2 md:w-3/4 w-full !bg-red-500 !border-red-600 !hover:bg-red-900/90"
        onClick={() => {
          dispatch(setUser(user));
          setIsOpen(true);
        }}
      >
        Delete Information
      </Button>

      {isOpen && (
        <Modal
          isOpen={isOpen}
          onClose={() => {
            dispatch(setUser({}));
            setIsOpen(false);
          }}
          className="lg:w-3/12 md:w-1/2 w-full z-50"
        >
          <section className="h-full w-full flex flex-col gap-y-4">
            <article className="flex flex-col gap-y-8 h-full overflow-y-auto">
              <div className="flex flex-col gap-y-1">
                <div className="flex flex-col gap-y-4">
                  <LoadImage
                    src={user?.avatar?.url}
                    alt={user?.avatar?.public_id}
                    height={100}
                    width={100}
                    className="h-[100px] w-[100px] rounded object-cover"
                  />
                  <h1 className="text-2xl">{user.name}</h1>
                </div>
                <div className="flex flex-col gap-y-1">
                  <p className="text-xs">{user.email}</p>
                  <p className="text-xs">{user.phone}</p>
                  <p className="flex flex-row gap-x-1">
                    <span className="bg-purple-100/50 text-purple-900 border border-purple-900 px-1.5 !text-xs rounded-primary uppercase">
                      {user.role}
                    </span>
                    <span className="bg-indigo-100/50 text-indigo-900 border border-indigo-900 px-1.5 !text-xs rounded-primary uppercase">
                      {user.status}
                    </span>
                    {user?.rents?.length > 0 && (
                      <span className="bg-cyan-100/50 text-cyan-900 border border-cyan-900 px-1.5 !text-xs rounded-primary uppercase">
                        Seller
                      </span>
                    )}
                  </p>
                </div>
              </div>
              <div className="text-sm flex flex-col gap-y-2.5">
                <p className="flex flex-row gap-x-1 items-center">
                  <MdWarningAmber className="w-5 h-5" /> This action can&lsquo;t be
                  undone!
                </p>
                <p className="flex flex-row gap-x-1 items-center">
                  <LuShoppingCart className="h-5 w-5" /> Your cart items will be
                  removed!
                </p>
                <p className="flex flex-row gap-x-1 items-center">
                  <MdFavoriteBorder className="h-5 w-5" /> Your favorite items
                  will be removed!
                </p>
                <p className="flex flex-row gap-x-1 items-center">
                  <BiSolidPurchaseTag className="h-5 w-5" /> Your{" "}
                  {user?.purchases?.length} purchases will be removed!
                </p>
                <p className="flex flex-row gap-x-1 items-center">
                  <TbDoorEnter className="h-5 w-5" /> Your {user?.rents?.length}{" "}
                  rents will be removed!
                </p>
                <p className="flex flex-row gap-x-1 items-center">
                  <MdOutlineReviews className="h-5 w-5" /> Your{" "}
                  {user?.reviews?.length} reviews will be removed!
                </p>
              </div>
            </article>
            <div className="flex flex-row gap-x-2 justify-end text-sm">
              <button
                type="button"
                className="flex flex-row items-center gap-x-0.5 bg-red-100/50 border border-red-900 text-red-900 px-2 py-1 rounded uppercase"
                onClick={() => {
                  dispatch(setUser({}));
                  setIsOpen(false);
                }}
              >
                <RxCross2 className="h-4 w-4" />
                Cancel
              </button>
              <button
                type="button"
                disabled={user?.role === "admin"}
                className="flex flex-row items-center gap-x-0.5 bg-green-100/50 border border-green-900 text-green-900 px-2 py-1 rounded uppercase"
                onClick={() => deleteUser(id)}
              >
                <AiOutlineDelete className="h-4 w-4" />
                Delete
              </button>
            </div>
          </section>
        </Modal>
      )}
    </>
  );
}

export default MyProfile;
