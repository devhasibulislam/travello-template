/**
 * Title: Write a program using JavaScript on Card
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
 * Date: 25, August 2023
 */

import React, { useEffect, useRef } from "react";
import { AiFillStar, AiOutlineLoading3Quarters } from "react-icons/ai";
import { IoMdPricetag } from "react-icons/io";
import {
  MdFavorite,
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
  MdLocationPin,
  MdOutlineFavoriteBorder,
} from "react-icons/md";
import Button from "../button/Button";
import LoadImage from "../image/LoadImage";
import "keen-slider/keen-slider.min.css";
import {
  useAddToFavoriteMutation,
  useDeleteFromFavoriteMutation,
} from "@/services/favorite/favoriteApi";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";

const Card = ({ tour }) => {
  const sliderRef = useRef(null);
  const user = useSelector((state) => state?.auth);
  const { status, gallery, members, title, location, price, _id } = tour || {};
  const [
    addToFavorite,
    {
      isLoading: addToFavoriteLoading,
      data: addToFavoriteData,
      error: addToFavoriteError,
    },
  ] = useAddToFavoriteMutation();
  const [
    deleteFromFavorite,
    {
      isLoading: deleteFromFavoriteLoading,
      data: deleteFromFavoriteData,
      error: deleteFromFavoriteError,
    },
  ] = useDeleteFromFavoriteMutation();

  useEffect(() => {
    if (addToFavoriteLoading) {
      toast.loading("Adding to favorite...", {
        id: "add-to-favorite",
      });
    }

    if (addToFavoriteData) {
      toast.success(addToFavoriteData?.message, {
        id: "add-to-favorite",
      });
    }

    if (addToFavoriteError?.data) {
      toast.error(addToFavoriteError?.data?.message, {
        id: "add-to-favorite",
      });
    }

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
    addToFavoriteError,
    addToFavoriteData,
    addToFavoriteLoading,
    deleteFromFavoriteError,
    deleteFromFavoriteData,
    deleteFromFavoriteLoading,
  ]);

  return (
    <section className="group flex flex-col gap-y-5 border-b border-l border-r rounded">
      <div className="relative rounded-t">
        <span
          className={`absolute text-xs rounded-r py-0.5 px-3 top-4 left-0 shadow z-10 ${
            /\d/.test(status)
              ? "bg-[#3DCAFD] text-white"
              : "bg-[#F7D348] text-black"
          }`}
        >
          {status}
        </span>
        {user?.favorite?.rents.some((rent) => rent?._id === _id) ? (
          <button
            className="absolute top-4 right-4 p-1.5 border rounded-full border-secondary bg-white hover:bg-primary hover:text-white duration-100 z-50 opacity-0 group-hover:opacity-100 transition-opacity ease-linear delay-100"
            onClick={() => deleteFromFavorite(_id)}
          >
            {deleteFromFavoriteLoading ? (
              <AiOutlineLoading3Quarters className="animate-spin" />
            ) : (
              <MdFavorite />
            )}
          </button>
        ) : (
          <button
            className="absolute top-4 right-4 p-1.5 border rounded-full border-secondary bg-white hover:bg-primary hover:text-white duration-100 z-50 opacity-0 group-hover:opacity-100 transition-opacity ease-linear delay-100"
            onClick={() => addToFavorite({ rent: _id })}
          >
            {addToFavoriteLoading ? (
              <AiOutlineLoading3Quarters className="animate-spin" />
            ) : (
              <MdOutlineFavoriteBorder />
            )}
          </button>
        )}
        <span className="absolute -bottom-2 right-4 text-xs text-primary bg-white px-3 py-1 rounded-full shadow capitalize z-50">
          {members} Members
        </span>
        <div className="rounded-t relative group">
          <div
            className="flex flex-row gap-x-1 overflow-x-auto scrollbar-hide h-[200px]"
            ref={sliderRef}
          >
            {gallery?.map((thumbnail, index) => (
              <LoadImage
                key={index}
                src={thumbnail?.url}
                alt={thumbnail?.public_id}
                width={480}
                height={200}
                className="rounded-t h-full w-full max-w-full object-cover"
              />
            ))}
          </div>
          <div className="absolute left-2 bottom-4 flex flex-row gap-x-2 z-50 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              type="button"
              className="h-6 w-6 bg-white rounded-secondary text-black flex flex-row justify-center items-center shadow-2xl"
              onClick={() => {
                {
                  const slider = sliderRef.current;
                  const scrollAmount = -280;

                  slider.scrollBy({
                    left: scrollAmount,
                    behavior: "smooth",
                  });
                }
              }}
            >
              <MdKeyboardArrowLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              className="h-6 w-6 bg-white rounded-secondary text-black flex flex-row justify-center items-center shadow-2xl"
              onClick={() => {
                {
                  const slider = sliderRef.current;
                  const scrollAmount = 280;

                  slider.scrollBy({
                    left: scrollAmount,
                    behavior: "smooth",
                  });
                }
              }}
            >
              <MdKeyboardArrowRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
      <article className="px-2 flex flex-col gap-y-4 h-full">
        <div className="flex flex-col gap-y-2 h-full">
          <h2 className="line-clamp-2">{title}</h2>
          <p className="flex flex-row flex-wrap gap-y-2 justify-between mt-auto">
            <span className="text-xs flex items-center gap-x-1 text-ellipsis overflow-hidden whitespace-nowrap capitalize">
              <MdLocationPin className="w-4 h-4 text-primary" /> {location}
            </span>
            <span className="text-xs flex items-center gap-x-1">
              <AiFillStar className="w-4 h-4 text-yellow-500" /> (
              {tour?.reviews?.length})
            </span>
          </p>
        </div>
        <div className="flex flex-col gap-y-4 mt-auto">
          <hr />
          <div className="flex items-center justify-between">
            <span className="text-xs flex items-center gap-x-1">
              <IoMdPricetag className="w-4 h-4 text-primary" />
              <span className="capitalize">${price}/night</span>
            </span>
            <Button
              className="px-4 py-1 text-xs"
              onClick={() =>
                window.open(
                  `/tours/${tour._id}?tour_title=${tour.title
                    .replace(/[^\w\s]|[\s]+/g, "-")
                    .replace(/-+/g, "-")
                    .toLowerCase()}`,
                  "_self"
                )
              }
            >
              Buy Now
            </Button>
          </div>
        </div>
        <div />
      </article>
    </section>
  );
};

export default Card;
