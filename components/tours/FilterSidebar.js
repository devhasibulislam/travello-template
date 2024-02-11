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
import useGetCountries from "@/hooks/useGetCountries";
import React, { useState } from "react";
// import { AiOutlineReload } from "react-icons/ai";
// import { BiSolidStar } from "react-icons/bi";
import { useDispatch } from "react-redux";
import LoadImage from "../shared/image/LoadImage";
import {
  setCategory,
  setCountries,
  setDateRange,
  setPriceRange,
  // setRatings,
  // resetFilter,
} from "@/features/filter/filterSlice";

const FilterSidebar = () => {
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [selectedCountries, setSelectedCountries] = useState([]);
  const [priceRange, setPriceRangeLocal] = useState({ min: 5, max: 500 });
  const [dateRange, setDateRangeLocal] = useState({
    startDate: null,
    endDate: null,
  });
  // const [selectedRatings, setSelectedRatings] = useState([]);

  const countries = useGetCountries();
  const dispatch = useDispatch();

  function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  // handle functions for updating local state and dispatching actions
  const handleCategoryChange = (selectedOptions) => {
    setSelectedCategory(selectedOptions);
    dispatch(setCategory(selectedOptions));
  };

  const handleCountriesChange = (selectedOptions) => {
    setSelectedCountries(selectedOptions);
    dispatch(setCountries(selectedOptions));
  };

  const handlePriceRangeChange = (min, max) => {
    setPriceRangeLocal({ min, max });
    dispatch(setPriceRange({ min, max }));
  };

  const handleDateRangeChange = (startDate, endDate) => {
    setDateRangeLocal({ startDate, endDate });
    dispatch(setDateRange({ startDate, endDate }));
  };

  // const handleRatingsChange = (selectedOptions) => {
  //   setSelectedRatings(selectedOptions);
  //   dispatch(setRatings(selectedOptions));
  // };

  // function renderStarIcons(count) {
  //   const stars = [];
  //   for (let i = 0; i < count; i++) {
  //     stars.push(<BiSolidStar key={i} className="text-yellow-500 h-4 w-4" />);
  //   }
  //   return stars;
  // }

  return (
    <aside className="lg:col-span-3 md:col-span-4 col-span-12">
      <section className="flex flex-col gap-y-4 md:sticky md:top-4">
        {/* Choose Category */}
        <div className="flex flex-col gap-y-4 border py-2 px-4 rounded">
          <h2 className="text-lg">Choose Category</h2>
          <div className="flex flex-col gap-y-2.5 h-40 overflow-y-auto">
            {hotelTypes?.length === 0 && <>Loading...</>}
            {hotelTypes?.map(({ name, icon }, index) => (
              <label
                key={index}
                htmlFor={name}
                className="text-sm flex flex-row items-center gap-x-1.5"
              >
                <input
                  type="checkbox"
                  name={name}
                  id={name}
                  className="!rounded-secondary checked:bg-primary checked:text-primary"
                  onChange={(e) => {
                    const isChecked = e.target.checked;
                    const updatedCategory = isChecked
                      ? [...selectedCategory, name]
                      : selectedCategory.filter(
                          (category) => category !== name
                        );
                    handleCategoryChange(updatedCategory);
                  }}
                />
                <span className="flex flex-row gap-x-1 items-center whitespace-normal truncate">
                  {icon}
                  {name}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Choose Country */}
        <div className="flex flex-col gap-y-4 border py-2 px-4 rounded">
          <h2 className="text-lg">Choose Country</h2>
          <div className="flex flex-col gap-y-2.5 h-40 overflow-y-auto">
            {countries?.length === 0 && <>Loading...</>}
            {countries?.map((country, index) => (
              <label
                key={index}
                htmlFor={country.name}
                className="text-sm flex flex-row items-center gap-x-1.5"
              >
                <input
                  type="checkbox"
                  name={country.name}
                  id={country.name}
                  className="!rounded-secondary checked:bg-primary checked:text-primary"
                  onChange={(e) => {
                    const isChecked = e.target.checked;
                    const updatedCountries = isChecked
                      ? [...selectedCountries, country.name]
                      : selectedCountries.filter((c) => c !== country.name);
                    handleCountriesChange(updatedCountries);
                  }}
                />
                <span className="flex flex-row gap-x-2 items-center whitespace-normal truncate">
                  <LoadImage
                    src={country.flag}
                    alt={country.name}
                    height={10}
                    width={20}
                  />
                  {country.name}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Price Range */}
        <div className="flex flex-col gap-y-4 border py-2 px-4 rounded">
          <h2 className="text-lg">Price Range</h2>
          <label htmlFor="price" className="flex flex-col gap-y-2">
            <input
              type="range"
              name="price"
              id="price"
              min={5}
              max={500}
              value={priceRange.min}
              onChange={(e) =>
                handlePriceRangeChange(Number(e.target.value), priceRange.max)
              }
              className="flex-1 bg-secondary appearance-none h-0 rounded"
            />
            <p className="text-xs flex flex-row items-center justify-between">
              ${priceRange.min.toFixed(2)}
              <span className="text-xs"> ${priceRange.max.toFixed(2)}</span>
            </p>
          </label>
        </div>

        {/* Date Range */}
        <div className="flex flex-col gap-y-4 border py-2 px-4 rounded">
          <h2 className="text-lg">Date Range</h2>
          <label
            htmlFor="startDate"
            className="flex flex-row gap-x-2 items-center"
          >
            <input
              type="date"
              id="startDate"
              value={dateRange.startDate}
              onChange={(e) =>
                handleDateRangeChange(e.target.value, dateRange.endDate)
              }
              className="flex-1 !text-sm !p-0 !border-0"
            />
            <div className="h-4 border" />
            <input
              type="date"
              id="endDate"
              value={dateRange.endDate}
              onChange={(e) =>
                handleDateRangeChange(dateRange.startDate, e.target.value)
              }
              className="flex-1 !text-sm !p-0 !border-0"
            />
          </label>
        </div>

        {/* Choose Ratings */}
        {/* <div className="flex flex-col gap-y-4 border py-2 px-4 rounded">
          <h2 className="text-lg">Choose Ratings</h2>
          <div className="flex flex-col gap-y-2.5">
            {[5, 4, 3, 2, 1].map((rating) => (
              <label
                key={rating}
                htmlFor={rating}
                className="text-sm flex flex-row items-center gap-x-1.5"
              >
                <input
                  type="checkbox"
                  name={rating.toString()}
                  id={rating.toString()}
                  className="!rounded-secondary checked:bg-primary checked:text-primary"
                  onChange={(e) => {
                    const isChecked = e.target.checked;
                    const updatedRatings = isChecked
                      ? [...selectedRatings, rating]
                      : selectedRatings.filter((r) => r !== rating);
                    handleRatingsChange(updatedRatings);
                  }}
                />
                <span className="flex flex-row gap-x-1 items-center">
                  {renderStarIcons(rating)}
                </span>
              </label>
            ))}
          </div>
        </div> */}

        {/* Reset Button */}
        {/* <button
          className="px-4 py-1 border border-primary !rounded-secondary flex flex-row gap-x-2 items-center w-fit bg-secondary text-primary"
          onClick={() => {
            setSelectedCategory([]);
            setSelectedCountries([]);
            setPriceRangeLocal({ min: 10, max: 500 });
            setDateRangeLocal({ startDate: null, endDate: null });
            // setSelectedRatings([]);
            dispatch(resetFilter());
          }}
        >
          Reset Filter
        </button> */}
      </section>
    </aside>
  );
};

export default FilterSidebar;
