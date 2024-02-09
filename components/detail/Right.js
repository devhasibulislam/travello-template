/**
 * Title: Write a program using JavaScript on Right
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

import React from "react";
import { AiFillStar } from "react-icons/ai";
import { BsSignTurnRight } from "react-icons/bs";
import Location from "./Location";
import { useSelector } from "react-redux";
import { FaUsers } from "react-icons/fa";

const Right = () => {
  const tour = useSelector((state) => state?.rent);

  return (
    <div className="lg:col-span-7 md:col-span-6 col-span-12 flex flex-col gap-y-4">
      <article className="flex flex-col gap-y-8">
        <div className="flex flex-col gap-y-4">
          <h1 className="lg:text-5xl md:text-3xl text-xl">{tour?.title}</h1>
          <p className="flex flex-row items-center gap-x-2">
            <span className="text-xs py-0.5 px-2 bg-indigo-50 text-indigo-800 border border-indigo-500 rounded-secondary capitalize">
              {tour?.location}
            </span>
            <span className="text-xs flex items-center gap-x-1 py-0.5 px-2 bg-purple-50 text-purple-800 border border-purple-500 rounded-secondary">
              <AiFillStar className="w-4 h-4 text-yellow-500" /> (
              {tour?.reviews?.length})
            </span>
            <span className="text-xs flex items-center gap-x-1 py-0.5 px-2 bg-indigo-50 text-indigo-800 border border-indigo-500 rounded-secondary">
              <FaUsers className="w-4 h-4 text-yellow-500" /> (
              {tour?.users?.length})
            </span>
          </p>
        </div>
        <div className="flex flex-col gap-y-6">
          <div className="flex flex-col gap-y-1.5">
            <h2 className="md:text-xl text-lg">Summary</h2>
            <p className="text-sm">{tour?.summary}</p>
          </div>
          <div className="flex flex-col gap-y-1.5">
            <h2 className="md:text-xl text-lg">Important Information</h2>
            <div className="flex flex-col gap-y-1">
              {tour?.information?.map((information, index) => (
                <p
                  key={index}
                  className="flex flex-row gap-x-2 items-start text-sm"
                >
                  <span className="p-0.5">
                    <BsSignTurnRight className="h-3.5 w-3.5" />
                  </span>
                  {information}
                </p>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-y-1.5">
            <h2 className="md:text-xl text-lg">Open Time</h2>
            <div className="flex flex-col gap-y-1">
              {tour?.times?.map((time, index) => (
                <p
                  key={index}
                  className="flex flex-row gap-x-2 items-center text-sm"
                >
                  <span className="p-0.5">
                    <BsSignTurnRight className="h-3.5 w-3.5" />
                  </span>
                  {time}
                </p>
              ))}
            </div>
          </div>
          <Location location={tour?.location} />
        </div>
      </article>
      <div className=""></div>
    </div>
  );
};

export default Right;
