/**
 * Title: Write a program using JavaScript on TravelTypes
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
 * Date: 17, August 2023
 */

import React, { useEffect, useState } from "react";
import OutsideClick from "@/components/shared/outsideClick/OutsideClick"; // Make sure to provide the correct import path here
import { useDispatch, useSelector } from "react-redux";
import { addTravelAvailability } from "@/features/travelAvailability/travelAvailabilitySlice";
import { BiChevronDown } from "react-icons/bi";
import { TbBuildingChurch } from "react-icons/tb";
import hotelTypes from "@/data/hotelTypes";

const TravelTypes = () => {
  const travelAvailability = useSelector((state) => state?.travelAvailability);
  const [isOpen, setIsOpen] = useState(false);
  const [hotelType, setHotelType] = useState(
    travelAvailability?.hotelType || ""
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(addTravelAvailability({ hotelType }));
    setIsOpen(false);
  }, [dispatch, hotelType]);

  const handleOutsideClick = () => {
    setIsOpen(!isOpen);
  };

  const types = hotelTypes;

  return (
    <section>
      <div className="relative">
        <button
          className="flex flex-row gap-x-2 items-center border border-primary px-2.5 py-1.5 rounded-primary"
          onClick={() => setIsOpen(!isOpen)}
        >
          <TbBuildingChurch className="text-xl" />
          <span className="flex flex-row gap-x-1 items-center text-sm">
            {travelAvailability?.hotelType ? (
              <>{travelAvailability?.hotelType}</>
            ) : (
              <>
                Hotel Types
                <BiChevronDown />
              </>
            )}
          </span>
        </button>

        {isOpen && (
          <div className="absolute top-full left-0 bg-secondary p-2.5 rounded shadow mt-2 z-50">
            <OutsideClick onOutsideClick={handleOutsideClick}>
              <div className="flex flex-col gap-y-2.5 max-h-60 w-40 overflow-y-auto countrySelection">
                {types.map(({ name, icon }) => (
                  <button
                    key={name}
                    className="flex flex-row gap-x-2 items-center"
                    onClick={() => setHotelType(name)}
                  >
                    {icon}
                    <p className="text-xs text-ellipsis overflow-hidden whitespace-nowrap">
                      {name}
                    </p>
                  </button>
                ))}
              </div>
            </OutsideClick>
          </div>
        )}
      </div>
    </section>
  );
};

export default TravelTypes;
