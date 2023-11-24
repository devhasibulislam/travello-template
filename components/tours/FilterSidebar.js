/**
 * Title: Write a program using JavaScript on FilterSidebar
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
 * Date: 01, November 2023
 */

import hotelTypes from "@/data/hotelTypes";
import { setRentFilter } from "@/features/rentFilter/rentFilterSlice";
import useGetCountries from "@/hooks/useGetCountries";
import React from "react";
import { AiOutlineReload } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";

const FilterSidebar = () => {
  const rentFilter = useSelector((state) => state.rentFilter);
  const countries = useGetCountries();
  const dispatch = useDispatch();

  function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  return (
    <aside className="lg:col-span-3 md:col-span-4 col-span-12">
      <section className="flex flex-col gap-y-4 md:sticky md:top-4">
        {/* reset */}
        <div className="flex flex-row items-center justify-between border py-2 px-4 rounded">
          <h2 className="text-lg">Filters Reset</h2>
          <button
            className="p-1 border border-primary !rounded-secondary"
            onClick={() => {
              dispatch(
                setRentFilter({
                  // startDate: "",
                  // endDate: "",
                  // price: "",
                  // location: "",
                  // type: "",
                })
              );
            }}
          >
            <AiOutlineReload className="h-5 w-5" />
          </button>
        </div>

        {/* Date Range */}
        <div className="flex flex-col gap-y-4 border py-2 px-4 rounded">
          <h2 className="text-lg">Date Range</h2>
          <label htmlFor="date" className="flex flex-row gap-x-2 items-center">
            <input
              type="date"
              name="date"
              id="date"
              className="flex-1 !text-sm !p-0 !border-0"
              value={formatDate(rentFilter?.startDate)}
              onChange={(event) =>
                dispatch(
                  setRentFilter({
                    ...rentFilter,
                    // duration: {
                    //   ...rentFilter.duration,
                    //   startDate: new Date(event.target.value),
                    // },
                    startDate: new Date(event.target.value),
                  })
                )
              }
            />
            <div className="h-4 border" />
            <input
              type="date"
              name="date"
              id="date"
              className="flex-1 !text-sm !p-0 !border-0"
              value={formatDate(rentFilter?.endDate)}
              onChange={(event) =>
                dispatch(
                  setRentFilter({
                    ...rentFilter,
                    // duration: {
                    //   ...rentFilter.duration,
                    //   endDate: new Date(event.target.value),
                    // },
                    endDate: new Date(event.target.value),
                  })
                )
              }
            />
          </label>
        </div>

        {/* price Range */}
        <div className="flex flex-col gap-y-4 border py-2 px-4 rounded">
          <h2 className="text-lg">Price Range</h2>
          <label htmlFor="price" className="flex flex-row gap-x-2 items-center">
            <input
              type="range"
              name="price"
              id="price"
              min={10}
              max={5000}
              className="flex-1 bg-secondary appearance-none h-1.5 rounded"
              value={rentFilter?.price || 0.0}
              onChange={(event) =>
                dispatch(
                  setRentFilter({
                    ...rentFilter,
                    price: event.target.value,
                  })
                )
              }
            />
            <p className="text-xs flex flex-row items-baseline">
              $<span className="text-base">{rentFilter.price || 0.0}</span>
            </p>
          </label>
        </div>

        {/* Choose Country */}
        <div className="flex flex-col gap-y-4 border py-2 px-4 rounded">
          <h2 className="text-lg">Choose Country</h2>
          {countries?.length === 0 ? (
            <>Loading...</>
          ) : (
            <select
              name="location"
              id="location"
              className="!px-0 !appearance-none border-0"
              value={rentFilter?.location}
              onChange={(event) => {
                dispatch(
                  setRentFilter({
                    ...rentFilter,
                    location: event.target.value,
                  })
                );
              }}
            >
              {countries?.map((country, index) => (
                <option key={index} value={country?.name?.toLowerCase()}>
                  {country?.name}
                </option>
              ))}
            </select>
          )}
        </div>

        {/* Choose Hotel Type */}
        <div className="flex flex-col gap-y-4 border py-2 px-4 rounded">
          <h2 className="text-lg">Choose Hotel Type</h2>
          {countries?.length === 0 ? (
            <>Loading...</>
          ) : (
            <select
              name="type"
              id="type"
              className="!px-0 !appearance-none border-0"
              value={rentFilter?.type}
              onChange={(event) => {
                dispatch(
                  setRentFilter({
                    ...rentFilter,
                    type: event.target.value,
                  })
                );
              }}
            >
              {hotelTypes?.map((type, index) => (
                <option key={index} value={type?.name?.toLowerCase()}>
                  {type?.name}
                </option>
              ))}
            </select>
          )}
        </div>
      </section>
    </aside>
  );
};

export default FilterSidebar;
