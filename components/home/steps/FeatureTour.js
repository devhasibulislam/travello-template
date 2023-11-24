/**
 * Title: Write a program using JavaScript on FeatureTour
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
 * Date: 28, September 2023
 */

import Button from "@/components/shared/button/Button";
import LoadImage from "@/components/shared/image/LoadImage";
import OutsideClick from "@/components/shared/outsideClick/OutsideClick";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { AiFillCar } from "react-icons/ai";
import { BiMap } from "react-icons/bi";
import { FaPlaneDeparture } from "react-icons/fa";
import { FiGift } from "react-icons/fi";

const FeatureTour = () => {
  const [gift, setGift] = useState(false);
  const router = useRouter();

  const handleOutsideClick = () => {
    setGift(!gift);
  };

  return (
    <>
      <section className="group flex lg:flex-row flex-col gap-4 border border-secondary p-4 rounded relative hover:border-primary transition-colors delay-100">
        <div className="flex flex-col gap-y-2">
          <LoadImage
            src="/assets/static/Premire and Simple 01.png"
            alt="feature tour"
            width={256}
            height={144}
            className="object-cover w-full rounded"
          />
          <p className="flex flex-row lg:justify-center gap-x-2">
            <span className="p-1.5 hover:border-primary ease-linear delay-100 transition-colors border-secondary border rounded-primary">
              <BiMap className="w-6 h-6 text-primary" />
            </span>
            <span className="p-1.5 hover:border-primary ease-linear delay-100 transition-colors border-secondary border rounded-primary">
              <FaPlaneDeparture className="w-6 h-6 text-primary" />
            </span>
            <span className="p-1.5 hover:border-primary ease-linear delay-100 transition-colors border-secondary border rounded-primary">
              <AiFillCar className="w-6 h-6 text-primary" />
            </span>
          </p>
        </div>

        <article className="flex flex-col gap-y-2.5">
          <h1 className="text-base line-clamp-2">
            The most confidential Rooftop in Paris - View 360
          </h1>
          <div className="flex flex-col gap-y-1">
            <p className="text-sm pb-0">
              20-30 September | By Dhaka, Bangladesh
            </p>
            <p className="text-sm pb-0 flex gap-x-0.5 items-baseline">
              $<span className="text-primary text-lg">150.00</span> as{" "}
              <span className="text-sm">Starter Pricing</span>
            </p>
          </div>
          <span className="border group-hover:border-primary transition-colors delay-100 px-4 py-0.5 rounded-primary flex items-center text-xs w-fit">
            Trip to France, Rome
          </span>
          <div className="flex flex-row flex-wrap justify-between">
            <Button
              className="px-8 py-2 text-base mt-2"
              disabled
              onClick={() =>
                router.push(
                  `/tours/5f3e1e7e3f3d5b1b7e7b5d6e?tour_title=Twin room in Historic Georgian Home`
                )
              }
            >
              <del>Book Now</del>
            </Button>
            <Button
              className="px-4 py-2 rounded text-base mt-2"
              onClick={() => setGift(!gift)}
            >
              <FiGift className="h-5 w-5" />
            </Button>
          </div>
        </article>

        {gift && (
          <div className="absolute top-0 left-0 w-full h-full rounded bg-secondary/20 backdrop-blur-sm backdrop-filter">
            <div className="h-full w-full rounded flex justify-center items-center">
              <OutsideClick onOutsideClick={handleOutsideClick}>
                <div className="flex flex-row gap-x-4 border border-primary p-4 rounded bg-white">
                  <LoadImage
                    src="/assets/static/Premire and Simple 02.png"
                    alt="avatar"
                    width={85.3}
                    height={48}
                    className="rounded object-cover w-[85.3px] h-[48px]"
                  />
                  <div className="flex flex-col gap-y-4">
                    <article className="flex flex-col gap-y-1.5">
                      <div className="flex flex-col gap-y-2">
                        <p className="text-sm">Ongoing!</p>
                        <h1 className="text-base line-clamp-2 font-semibold">
                          Villa Borghese Luxury One BR apartment
                        </h1>
                      </div>
                      <div className="flex flex-col gap-y-2">
                        <p className="text-sm">40% complete</p>
                        <p className="border h-1.5 w-full bg-gray-200 rounded">
                          <span className="h-full bg-primary block w-[40%] rounded"></span>
                        </p>
                      </div>
                    </article>
                    <span className="border group-hover:border-primary transition-colors delay-100 px-4 py-0.5 rounded flex items-center text-xs w-fit">
                      Trip to France, Rome
                    </span>
                  </div>
                </div>
              </OutsideClick>
            </div>
          </div>
        )}
      </section>
    </>
  );
};

export default FeatureTour;
