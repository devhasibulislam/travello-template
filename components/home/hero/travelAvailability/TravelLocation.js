/**
 * Title: Write a program using JavaScript on TravelLocation
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

// import Image from "next/image";
import LoadImage from "@/components/shared/image/LoadImage";
import OutsideClick from "@/components/shared/outsideClick/OutsideClick";
import { addTravelAvailability } from "@/features/travelAvailability/travelAvailabilitySlice";
import useGetCountries from "@/hooks/useGetCountries";
import React, { useEffect, useState } from "react";
import { BiChevronDown, BiMap } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";

const TravelLocation = () => {
  const travelAvailability = useSelector((state) => state?.travelAvailability);
  const [isOpen, setIsOpen] = useState(false);
  const [location, setLocation] = useState(travelAvailability?.location || "");
  const countries = useGetCountries();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(addTravelAvailability({ location }));
    setIsOpen(false);
  }, [dispatch, location]);

  const handleOutsideClick = () => {
    setIsOpen(!isOpen);
  };

  // function toBase64(str) {
  //   return btoa(unescape(encodeURIComponent(str)));
  // }

  // function shimmer(width, height) {
  //   return `https://placehold.co/${width}x${height}.svg`;
  // }

  return (
    <section>
      <div className="relative">
        <button
          className="flex flex-row gap-x-2 items-center border border-primary px-2.5 py-1.5 rounded-primary"
          onClick={() => setIsOpen(!isOpen)}
        >
          <BiMap className="text-xl" />
          <span className="flex flex-row gap-x-1 items-center text-sm">
            {travelAvailability?.location ? (
              <>{travelAvailability?.location}</>
            ) : (
              <>
                Pick Location
                <BiChevronDown />
              </>
            )}
          </span>
        </button>

        {isOpen && (
          <div className="absolute top-full left-0 bg-secondary p-2.5 rounded shadow mt-2 z-50">
            <OutsideClick onOutsideClick={handleOutsideClick}>
              {countries.length ? (
                <div className="flex flex-col gap-y-2.5 max-h-60 w-40 overflow-y-auto">
                  {countries?.length === 0 ? (
                    <>Loading...</>
                  ) : (
                    countries.map(({ id, name, flag }) => (
                      <button
                        key={id}
                        className="flex flex-row gap-x-2 items-center"
                        onClick={() => setLocation(name)}
                      >
                        <LoadImage
                          src={flag}
                          alt={name}
                          height={10}
                          width={20}
                          // placeholder="blur"
                          // blurDataURL={`data:image/svg+xml;base64,${toBase64(
                          //   shimmer(20, 10)
                          // )}`}
                        />

                        <p className="text-xs text-ellipsis overflow-hidden whitespace-nowrap">
                          {name}
                        </p>
                      </button>
                    ))
                  )}
                </div>
              ) : (
                <p className="text-xs text-center w-40">Loading...</p>
              )}
            </OutsideClick>
          </div>
        )}
      </div>
    </section>
  );
};

export default TravelLocation;
