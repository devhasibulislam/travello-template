/**
 * Title: Write a program using JavaScript on Left
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
 * Date: 19, October 2023
 */

import React, { useEffect } from "react";
import LoadImage from "@/components/shared/image/LoadImage";
import { AiOutlineCalendar } from "react-icons/ai";
import { BiCodeAlt } from "react-icons/bi";
import { FiUsers } from "react-icons/fi";
import { MdAttachMoney } from "react-icons/md";
import { useAddToCartMutation } from "@/services/cart/cartApi";
import { useSelector } from "react-redux";

const Left = ({ tour }) => {
  const [addToCart, { isLoading, data, error }] = useAddToCartMutation();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    if (data) {
      alert(data?.message);
    }
    if (error?.data) {
      alert(error?.data?.message);
    }
  }, [data, error]);

  function getColumnSpanClass(index, totalThumbnails) {
    if (totalThumbnails === 1 || totalThumbnails === 2) {
      return "col-span-12";
    } else if (totalThumbnails === 3) {
      return index === 0 ? "col-span-12" : "col-span-6";
    } else if (totalThumbnails === 4) {
      return index === 0 || index === 1 ? "col-span-12" : "col-span-6";
    } else if (totalThumbnails === 5) {
      return index === 0 || index === 1
        ? "col-span-12"
        : index === 2 || index === 3
        ? "col-span-6"
        : "col-span-12";
    } else {
      return "";
    }
  }

  function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  return (
    <div className="lg:col-span-5 md:col-span-6 col-span-12 flex flex-col md:gap-y-8 gap-y-4">
      <div className="grid grid-cols-12 gap-4">
        {tour?.gallery?.map((thumbnail, index) => (
          <LoadImage
            key={index}
            src={thumbnail?.url}
            alt={thumbnail?.public_id}
            className={
              "rounded object-center max-w-full w-full" +
              " " +
              getColumnSpanClass(index, tour.gallery.length)
            }
            width={480}
            height={200}
          />
        ))}
      </div>
      <div className="border border-secondary flex flex-col gap-y-8 lg:p-8 md:p-6 p-4 rounded w-full">
        <div className="flex flex-col gap-y-2">
          <h2 className="text-lg">Booking Now</h2>
          <hr className="border-1 border-primary" />
        </div>

        <form action="" className="flex flex-col gap-y-3">
          <label
            htmlFor="duration"
            className="flex flex-row gap-x-2 items-start"
          >
            <span className="h-8 w-8 rounded-secondary border border-black flex justify-center items-center p-1.5">
              <AiOutlineCalendar className="w-6 h-6" />
            </span>
            <p className="flex md:flex-row flex-col gap-2 w-full">
              <input
                type="date"
                name="startDate"
                id="startDate"
                className="rounded-secondary h-8 w-full flex-1"
                value={formatDate(tour?.duration?.startDate)}
                readOnly
              />
              <input
                type="date"
                name="endDate"
                id="endDate"
                className="rounded-secondary h-8 w-full flex-1"
                value={formatDate(tour?.duration?.endDate)}
                readOnly
              />
            </p>
          </label>
          <div className="flex md:flex-row flex-col gap-2">
            <label
              htmlFor="members"
              className="flex flex-row gap-x-2 items-center"
            >
              <span className="h-8 w-8 rounded-secondary border border-black flex justify-center items-center p-1.5">
                <FiUsers className="w-6 h-6" />
              </span>
              <input
                type="number"
                name="members"
                id="members"
                className="rounded-secondary h-8 w-full"
                value={tour?.members}
                readOnly
              />
            </label>
            <label
              htmlFor="Price"
              className="flex flex-row gap-x-2 items-center"
            >
              <span className="h-8 w-8 rounded-secondary border border-black flex justify-center items-center p-1.5">
                <MdAttachMoney className="w-6 h-6" />
              </span>
              <input
                type="number"
                name="Price"
                id="Price"
                className="rounded-secondary h-8 w-full"
                placeholder="Pricing Amount"
                value={`${tour?.price}.00`}
                readOnly
              />
            </label>
          </div>
        </form>
        <button
          type="button"
          disabled={isLoading}
          className="bg-primary hover:bg-secondary hover:text-primary hover:border-primary border border-transparent text-white p-1.5 rounded-primary flex justify-center items-center transition-all delay-100 text-sm"
          onClick={() => addToCart({
            rent: tour?._id,
            user: user?._id
          })}
        >
          {isLoading ? "Loading..." : "Book Now"}
        </button>
      </div>
    </div>
  );
};

export default Left;
