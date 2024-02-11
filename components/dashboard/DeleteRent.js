/**
 * Title: Write a program using JavaScript on DeleteRent
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
 * Date: 18, November 2023
 */

import { setRent } from "@/features/rent/rentSlice";
import {
  useDeleteRentMutation,
  useGetRentQuery,
} from "@/services/rent/rentApi";
import React, { useEffect, useMemo, useState } from "react";
import { AiOutlineDelete, AiOutlineLoading3Quarters } from "react-icons/ai";
import { FiTrash } from "react-icons/fi";
import { useDispatch } from "react-redux";
import Modal from "../shared/modal/Modal";
import LoadImage from "../shared/image/LoadImage";
import { MdOutlineReviews, MdWarningAmber } from "react-icons/md";
import { LuShoppingCart } from "react-icons/lu";
import { RxCross2 } from "react-icons/rx";
import { toast } from "react-hot-toast";
import { TbDoorEnter } from "react-icons/tb";

const DeleteRent = ({ id }) => {
  const [isOpen, setIsOpen] = useState(false);
  const {
    isLoading: fetching,
    data: fetchData,
    error: fetchError,
  } = useGetRentQuery(id);
  const rent = useMemo(() => fetchData?.data || {}, [fetchData]);
  const [
    deleteRent,
    { isLoading: deleting, data: deleteData, error: deleteError },
  ] = useDeleteRentMutation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (fetching) {
      toast.loading("Updating Rent Information...", {
        id: "fetchRent",
      });
    }

    if (fetchData) {
      toast.success(fetchData?.message, { id: "fetchRent" });
    }

    if (fetchError?.data) {
      toast.error(fetchError?.data?.message, { id: "fetchRent" });
    }

    if (deleting) {
      toast.loading("Deleting Rent...", { id: "deleteRent" });
    }

    if (deleteData) {
      toast.success(deleteData?.message, { id: "deleteRent" });
      setIsOpen(false);
    }

    if (deleteError?.data) {
      toast.error(deleteError?.data?.message, { id: "deleteRent" });
    }
  }, [fetching, fetchData, fetchError, deleting, deleteData, deleteError]);

  return (
    <>
      <button
        type="button"
        disable={deleting}
        className="p-1 rounded-secondary bg-red-500 !text-white"
        onClick={() => {
          dispatch(setRent(rent));
          setIsOpen(true);
        }}
      >
        <FiTrash className="w-5 h-5" />
      </button>

      {isOpen && (
        <Modal
          isOpen={isOpen}
          onClose={() => {
            dispatch(setRent({}));
            setIsOpen(false);
          }}
          className="lg:w-3/12 md:w-1/2 w-full z-50"
        >
          <section className="h-full w-full flex flex-col gap-y-4">
            <article className="flex flex-col gap-y-6 h-full overflow-y-auto">
              <div className="flex flex-col gap-y-2">
                <div className="flex flex-col gap-y-4">
                  <div className="flex -space-x-4">
                    {rent?.gallery?.map((gallery) => (
                      <LoadImage
                        key={gallery?._id}
                        src={gallery?.url}
                        alt={gallery?.public_id}
                        height={50}
                        width={50}
                        className="h-[50px] w-[50px] rounded-secondary border border-primary object-cover"
                      />
                    ))}
                  </div>
                  <h1 className="text-2xl whitespace-normal">{rent.title}</h1>
                </div>
                <div className="flex flex-col gap-y-1.5">
                  <p className="text-xs">
                    {rent.owner.name}{" "}
                    <span className="bg-teal-100/50 text-teal-900 border border-teal-900 px-1.5 !text-xs rounded-primary lowercase">
                      Owner
                    </span>
                  </p>
                  <p className="text-xs whitespace-normal">{rent.summary}</p>
                  <p className="flex flex-row gap-x-1">
                    <span className="bg-purple-100/50 text-purple-900 border border-purple-900 px-1.5 !text-xs rounded-primary uppercase">
                      ${rent.price} per night
                    </span>
                    <span className="bg-indigo-100/50 text-indigo-900 border border-indigo-900 px-1.5 !text-xs rounded-primary uppercase">
                      {rent.type}
                    </span>
                    <span className="bg-cyan-100/50 text-cyan-900 border border-cyan-900 px-1.5 !text-xs rounded-primary uppercase">
                      {rent.status}
                    </span>
                  </p>
                </div>
              </div>
              <div className="text-sm flex flex-col gap-y-1.5">
                <p className="flex flex-row gap-x-1 items-center">
                  <MdWarningAmber className="w-5 h-5" /> This action can&lsquo;t be
                  undone!
                </p>
                <p className="flex flex-row gap-x-1 items-center">
                  <LuShoppingCart className="h-5 w-5" /> Your will lost{" "}
                  {rent?.users?.length} users!
                </p>
                <p className="flex flex-row gap-x-1 items-center">
                  <MdOutlineReviews className="h-5 w-5" /> You will lost{" "}
                  {rent?.reviews?.length} reviews!
                </p>
              </div>
            </article>
            <div className="flex flex-row gap-x-2 justify-end text-sm">
              <button
                type="button"
                className="flex flex-row items-center gap-x-0.5 bg-red-100/50 border border-red-900 text-red-900 px-2 py-1 rounded uppercase"
                onClick={() => {
                  dispatch(setRent({}));
                  setIsOpen(false);
                }}
              >
                <RxCross2 className="h-4 w-4" />
                Cancel
              </button>
              <button
                type="button"
                className="flex flex-row items-center gap-x-0.5 bg-green-100/50 border border-green-900 text-green-900 px-2 py-1 rounded uppercase"
                onClick={() => deleteRent(id)}
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

export default DeleteRent;
