/**
 * Title: Write a program using JavaScript on TravelAvailability
 * Author: Hasibul Islam
 * Portfolio: https://devhasibulislam.vercel.app
 * Linkedin: https://linkedin.com/in/devhasibulislam
 * GitHub: https://github.com/in/devhasibulislam
 * Facebook: https://facebook.com/in/devhasibulislam
 * Instagram: https://instagram.com/in/devhasibulislam
 * Twitter: https://twitter.com/in/devhasibulislam
 * Pinterest: https://pinterest.com/in/devhasibulislam
 * WhatsApp: https://wa.me/8801906315901
 * Telegram: devhasibulislam
 * Date: 17, August 2023
 */

import React from "react";
import TravelTab from "./TravelTab";
import TravelLocation from "./TravelLocation";
import TravelDate from "./TravelDate";
import TravelPrice from "./TravelPrice";
import TravelTypes from "./TravelTypes";
import { BiChevronRight } from "react-icons/bi";
import Tooltip from "@/components/shared/tooltip/Tooltip";
import { useRouter } from "next/router";

const TravelAvailability = () => {
  const router = useRouter();

  return (
    <section>
      <div className="flex flex-col gap-y-4">
        <TravelTab />
        <hr />
        <div className="flex flex-row items-center flex-wrap gap-4">
          <TravelLocation />
          <TravelPrice />
          <TravelDate />
          <TravelTypes />
          <span>
            <Tooltip text="Destination">
              <button
                type="button"
                className="bg-primary hover:bg-secondary hover:text-primary hover:border-primary border border-transparent text-white p-1.5 rounded-primary flex justify-center items-center transition-all delay-100"
                onClick={() => router.push("/tours")}
              >
                <BiChevronRight className="text-2xl" />
              </button>
            </Tooltip>
          </span>
        </div>
      </div>
    </section>
  );
};

export default TravelAvailability;
