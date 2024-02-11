/**
 * Title: Write a program using JavaScript on DeleteUser
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

import React, { useEffect, useMemo, useState } from "react";
import { FiTrash } from "react-icons/fi";
import { AiOutlineDelete, AiOutlineLoading3Quarters } from "react-icons/ai";
import {
  useDeleteUserMutation,
  useGetUserQuery,
} from "@/services/user/userApi";
import { toast } from "react-hot-toast";
import Modal from "../shared/modal/Modal";
import LoadImage from "../shared/image/LoadImage";
import { RxCross2 } from "react-icons/rx";
import { setUser } from "@/features/user/userSlice";
import { useDispatch } from "react-redux";
import { MdFavoriteBorder, MdOutlineReviews, MdWarningAmber } from "react-icons/md";
import { LuShoppingCart } from "react-icons/lu";
import { BiSolidPurchaseTag } from "react-icons/bi";
import { TbDoorEnter } from "react-icons/tb";

const DeleteUser = ({ id }) => {
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
    }

    if (deleteError?.data) {
      toast.error(deleteError?.data?.message, { id: "deleteUser" });
    }
  }, [fetching, fetchData, fetchError, deleting, deleteData, deleteError]);

  return (
    <>
      <button
        type="button"
        disable={deleting}
        className="p-1 rounded-secondary bg-red-500 !text-white"
        onClick={() => {
          dispatch(setUser(user));
          setIsOpen(true);
        }}
      >
        <FiTrash className="w-5 h-5" />
      </button>

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
};

export default DeleteUser;
