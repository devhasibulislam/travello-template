/**
 * Title: Write a program using JavaScript on DestinationByMonth
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
 * Date: 20, September 2023
 */

import React, { useState } from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import LoadImage from "@/components/shared/image/LoadImage";

const DestinationByMonth = () => {
  const [selectMonth, setSelectMonth] = useState("January");
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const [sliderRef] = useKeenSlider({
    breakpoints: {
      "(max-width: 821px)": {
        slides: {
          perView: 4,
          spacing: 10,
        },
      },
      "(max-width: 768px)": {
        slides: {
          perView: 3,
          spacing: 10,
        },
      },
      "(max-width: 480px)": {
        slides: {
          perView: 2,
          spacing: 5,
        },
      },
      "(min-width: 822px)": {
        slides: {
          perView: 6,
          spacing: 15,
        },
      },
    },
  });

  const photos = [
    "/assets/static/Destination by Month/1.png",
    "/assets/static/Destination by Month/2.png",
    "/assets/static/Destination by Month/3.png",
    "/assets/static/Destination by Month/4.png",
    "/assets/static/Destination by Month/5.png",
    "/assets/static/Destination by Month/6.png",
    "/assets/static/Destination by Month/7.png",
    "/assets/static/Destination by Month/8.png",
    "/assets/static/Destination by Month/9.png",
    "/assets/static/Destination by Month/10.png",
    "/assets/static/Destination by Month/11.png",
    "/assets/static/Destination by Month/12.png",
    "/assets/static/Destination by Month/13.png",
    "/assets/static/Destination by Month/14.png",
    "/assets/static/Destination by Month/15.png",
    "/assets/static/Destination by Month/16.png",
  ];

  // Function to get random elements from an array
  function getRandomElements(array, numElements) {
    const shuffledArray = array.sort(() => 0.5 - Math.random());
    return shuffledArray.slice(0, numElements);
  }

  // Select 3 random images from the photos array
  const images = getRandomElements(photos, 8);

  return (
    <div className="relative w-full flex flex-col gap-y-8">
      <div ref={sliderRef} className="keen-slider">
        {months.map((month, index) => (
          <div
            key={index}
            data-index={index}
            onClick={() => setSelectMonth(month)}
            className={`keen-slider__slide px-2 py-1 border border-primary text-center rounded-full cursor-pointer transition-colors delay-100 flex gap-x-2 items-center justify-center ${
              selectMonth === month
                ? "bg-secondary text-primary"
                : "bg-primary text-secondary"
            }`}
          >
            <span className="border px-1.5 py-0.5 rounded text-xs">
              {index + 1}. {month.slice(0, 3)}
            </span>
            {month}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-12 gap-4">
        {images.map((img, index) => (
          <div
            key={index}
            className={`relative border rounded lg:col-span-3 md:col-span-6 col-span-12 bg-secondary`}
          >
            <LoadImage
              src={img}
              alt={img}
              height={180}
              width={237}
              className="h-[180px] w-full max-w-full object-contain rounded border border-primary"
            />
            <span className="absolute top-0 left-4 bg-primary h-8 w-5 flex justify-center items-center rounded-b-full text-white text-sm">
              {index + 1}
            </span>
            <span
              className="absolute bottom-2 right-2 bg-primary h-fit w-fit px-0.5 py-2.5 flex justify-center items-center rounded-xl text-white text-xs"
              style={{ writingMode: "vertical-rl" }}
            >
              {selectMonth}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DestinationByMonth;
