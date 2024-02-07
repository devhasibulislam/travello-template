/**
 * Title: Write a program using JavaScript on Favorites
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
 * Date: 04, February 2024
 */

import React, { useEffect, useMemo, useState } from "react";
import Tooltip from "../../tooltip/Tooltip";
import { IoCartOutline } from "react-icons/io5";
import Modal from "../../modal/Modal";
import HighlightText from "../../highlightText/HighlightText";
import CartCard from "../../loading/cartCard";
import Image from "next/image";
import { useGetCartQuery } from "@/services/cart/cartApi";
import { useSelector } from "react-redux";
import { MdFavoriteBorder } from "react-icons/md";
import LoadImage from "../../image/LoadImage";
import { useDeleteFromFavoriteMutation } from "@/services/favorite/favoriteApi";
import { FiTrash } from "react-icons/fi";
import { toast } from "react-hot-toast";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const Favorites = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const user = useSelector((state) => state?.auth);

  const [
    deleteFromFavorite,
    {
      isLoading: deleteFromFavoriteLoading,
      data: deleteFromFavoriteData,
      error: deleteFromFavoriteError,
    },
  ] = useDeleteFromFavoriteMutation();

  useEffect(() => {
    if (deleteFromFavoriteLoading) {
      toast.loading("Removing from favorite...", {
        id: "remove-from-favorite",
      });
    }

    if (deleteFromFavoriteData) {
      toast.success(deleteFromFavoriteData?.message, {
        id: "remove-from-favorite",
      });
    }

    if (deleteFromFavoriteError?.data) {
      toast.error(deleteFromFavoriteError?.data?.message, {
        id: "remove-from-favorite",
      });
    }
  }, [
    deleteFromFavoriteError,
    deleteFromFavoriteData,
    deleteFromFavoriteLoading,
  ]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Tooltip text="Favorites">
        <button
          className="p-1.5 border border-primary/20 hover:border-primary rounded relative"
          onClick={openModal}
        >
          <MdFavoriteBorder className="text-lg" />

          <span
            className={`h-2 w-2 rounded-secondary absolute -top-1 -right-1 ${
              user?.favorite?.rents?.length > 0 && "bg-green-500"
            }`}
          ></span>
        </button>
      </Tooltip>

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        className="lg:w-1/3 md:w-1/2 w-full z-50"
      >
        <div className="flex flex-col gap-y-4">
          <h1 className="text-2xl drop-shadow">
            Check Your <HighlightText>Favorites</HighlightText>
          </h1>
          <section className="h-full w-full">
            {user?.favorite?.rents?.length === 0 ? (
              <p className="text-sm text-red-500">No rents found!</p>
            ) : (
              <section className="grid grid-cols-2 gap-4">
                {user?.favorite?.rents?.map((rent) => (
                  <div
                    key={rent?._id}
                    className="flex flex-col gap-y-2.5 border p-4 rounded relative"
                  >
                    <span className="flex -space-x-4">
                      {rent?.gallery?.map((gallery) => (
                        <LoadImage
                          key={gallery?._id}
                          src={gallery?.url}
                          alt={gallery?.public_id}
                          height={30}
                          width={30}
                          className="h-[30px] w-[30px] rounded-secondary border border-primary object-cover"
                        />
                      ))}
                    </span>

                    <article className="flex flex-col gap-y-2">
                      <div className="">
                        <h2 className="line-clamp-1">{rent?.title}</h2>
                        <p className="line-clamp-2 text-xs">
                          {rent?.description}
                        </p>
                      </div>
                      <div className="flex flex-row gap-x-2 items-start">
                        <Image
                          src={user?.avatar?.url}
                          alt={user?.avatar?.public_id}
                          height={25}
                          width={25}
                          className="h-[25px] w-[25px] rounded-secondary object-cover"
                        />
                        <div className="flex flex-col gap-y-0.5 flex-1 w-full">
                          <h2 className="text-sm">{user?.name}</h2>
                          <p className="text-xs !line-clamp-1">{user?.email}</p>
                        </div>
                      </div>
                    </article>

                    <button
                      type="button"
                      className="absolute top-2 right-2 p-1 rounded-secondary bg-red-500 !text-white"
                      onClick={() => deleteFromFavorite(rent?._id)}
                    >
                      {deleteFromFavoriteLoading ? (
                        <AiOutlineLoading3Quarters className="animate-spin" />
                      ) : (
                        <FiTrash className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                ))}
              </section>
            )}
          </section>
        </div>
      </Modal>
    </>
  );
};

export default Favorites;
