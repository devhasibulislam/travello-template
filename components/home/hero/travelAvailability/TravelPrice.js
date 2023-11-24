/**
 * Title: Write a program using JavaScript on TravelPrice
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

import React, { useEffect, useState } from "react";
import OutsideClick from "@/components/shared/outsideClick/OutsideClick";
import { BiChevronDown } from "react-icons/bi";
import { IoMdPricetags } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { addTravelAvailability } from "@/features/travelAvailability/travelAvailabilitySlice";

const TravelPrice = () => {
  const travelAvailability = useSelector((state) => state?.travelAvailability);
  const [minPrice, setMinPrice] = useState(
    travelAvailability?.priceRange?.start || 0
  );
  const [maxPrice, setMaxPrice] = useState(
    travelAvailability?.priceRange?.end || 0
  );
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      addTravelAvailability({
        priceRange: { start: Number(minPrice), end: Number(maxPrice) },
      })
    );
  }, [dispatch, minPrice, maxPrice]);

  const handleOutsideClick = () => {
    setIsOpen(!isOpen);
  };

  const handleMinPriceChange = (event) => {
    setMinPrice(event.target.value);
  };

  const handleMaxPriceChange = (event) => {
    setMaxPrice(event.target.value);
  };

  return (
    <section>
      <div className="relative">
        <button
          className="flex flex-row gap-x-2 items-center border border-primary px-2.5 py-1.5 rounded-primary"
          onClick={() => setIsOpen(!isOpen)}
        >
          <IoMdPricetags className="text-xl" />
          <span className="flex flex-row gap-x-1 items-center text-sm">
            {travelAvailability?.priceRange?.start &&
            travelAvailability?.priceRange?.end ? (
              <>
                ${travelAvailability?.priceRange?.start} -{" "}
                ${travelAvailability?.priceRange?.end}
              </>
            ) : (
              <>
                Price Range
                <BiChevronDown />
              </>
            )}
          </span>
        </button>

        {isOpen && (
          <div className="absolute top-full left-0 bg-secondary px-2.5 py-primary rounded shadow mt-2 z-50">
            <OutsideClick onOutsideClick={handleOutsideClick}>
              <div className="flex flex-col gap-y-2.5 max-h-60 w-40">
                <style js>
                  {`
                        .slider {
                            width: 100%;
                            height: 5px;
                            border-radius: 50px;
                            background-color: #01BC1FD6;
                            -webkit-appearance: none;
                            appearance: none;
                            outline: none;
                            &::-webkit-slider-thumb {
                              width: 15px;
                              height: 15px;
                              background-color: #E4FFEA;
                              border-radius: 50%;
                              cursor: pointer;
                              -webkit-appearance: none;
                              appearance: none;
                              border: 1px solid #24c855;
                              cursor: grab;
                            }
                            &::-moz-range-thumb {
                              width: 15px;
                              height: 15px;
                              background-color: #E4FFEA;
                              border-radius: 50%;
                              cursor: pointer;
                              cursor: grab;
                            }
                          }
                    `}
                </style>
                <div className="flex flex-col gap-y-4">
                  <div className="flex flex-col gap-y-2">
                    <p className="flex justify-between items-center">
                      <span className="text-xs">Start</span>
                      <span className="text-xs">${minPrice}</span>
                    </p>
                    <input
                      type="range"
                      min="0"
                      max="1000"
                      step="1"
                      value={minPrice}
                      onChange={handleMinPriceChange}
                      className="slider shadow-inner"
                    />
                  </div>
                  <div className="flex flex-col gap-y-2">
                    <p className="flex justify-between items-center">
                      <span className="text-xs">End</span>
                      <span className="text-xs">${maxPrice}</span>
                    </p>
                    <input
                      type="range"
                      min="0"
                      max="1000"
                      step="1"
                      value={maxPrice}
                      onChange={handleMaxPriceChange}
                      className="slider shadow-inner"
                    />
                  </div>
                </div>
              </div>
            </OutsideClick>
          </div>
        )}
      </div>
    </section>
  );
};

export default TravelPrice;
