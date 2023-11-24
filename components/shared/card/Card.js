/**
 * Title: Write a program using JavaScript on Card
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
 * Date: 25, August 2023
 */

import React, { useState } from "react";
import { AiFillStar } from "react-icons/ai";
import { IoMdPricetag } from "react-icons/io";
import { MdLocationPin, MdOutlineFavoriteBorder } from "react-icons/md";
import Button from "../button/Button";
import LoadImage from "../image/LoadImage";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { useRouter } from "next/router";

const Card = ({ tour }) => {
  const router = useRouter();

  const { status, gallery, members, title, location, price } = tour || {};

  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [sliderRef, instanceRef] = useKeenSlider(
    {
      loop: true,
      initial: 0,
      slideChanged(slider) {
        setCurrentSlide(slider.track.details.rel);
      },
      created() {
        setLoaded(true);
      },
      slides: {
        perView: 1,
        spacing: -4,
      },
    },
    [
      (slider) => {
        let timeout;
        let mouseOver = false;
        function clearNextTimeout() {
          clearTimeout(timeout);
        }
        function nextTimeout() {
          clearTimeout(timeout);
          if (mouseOver) return;
          timeout = setTimeout(() => {
            slider.next();
          }, 3000);
        }
        slider.on("created", () => {
          slider.container.addEventListener("mouseover", () => {
            mouseOver = true;
            clearNextTimeout();
          });
          slider.container.addEventListener("mouseout", () => {
            mouseOver = false;
            nextTimeout();
          });
          nextTimeout();
        });
        slider.on("dragStarted", clearNextTimeout);
        slider.on("animationEnded", nextTimeout);
        slider.on("updated", nextTimeout);
      },
    ]
  );

  return (
    <section className="group flex flex-col gap-y-5 border-b border-l border-r rounded">
      <div className="relative rounded-t">
        <span
          className={`absolute text-xs rounded-r py-0.5 px-3 top-4 left-0 shadow z-10 ${
            /\d/.test(status)
              ? "bg-[#3DCAFD] text-white"
              : "bg-[#F7D348] text-black"
          }`}
        >
          {status}
        </span>
        <button className="absolute top-4 right-4 p-1.5 border rounded-full border-secondary bg-white/80 hover:bg-primary hover:text-white duration-100 z-50 opacity-0 group-hover:opacity-100 transition-opacity ease-linear delay-100">
          <MdOutlineFavoriteBorder />
        </button>
        <span className="absolute -bottom-2 right-4 text-xs text-primary bg-white/80 px-3 py-1 rounded-full shadow capitalize z-50">
          {members} Members
        </span>
        <div
          className="flex flex-row gap-x-2 overflow-x-auto keen-slider relative rounded-t"
          ref={sliderRef}
        >
          {gallery?.map((thumbnail, index) => (
            <div key={index} className="keen-slider__slide">
              <LoadImage
                src={thumbnail?.url}
                alt={thumbnail?.public_id}
                width={480}
                height={200}
                className="rounded-t h-[200px] w-full object-cover"
              />
            </div>
          ))}
          {loaded && instanceRef?.current && (
            <div className="flex gap-x-1 py-2.5 justify-center items-center absolute bottom-0 w-full">
              {[
                ...Array(
                  instanceRef?.current?.track?.details?.slides?.length
                ).keys(),
              ].map((idx) => {
                return (
                  <button
                    key={idx}
                    onClick={() => {
                      instanceRef?.current?.moveToIdx(idx);
                    }}
                    className={
                      "h-2.5 w-2.5 bg-primary rounded-full p-1.5" +
                      (currentSlide === idx ? " bg-secondary" : "bg-primary")
                    }
                  ></button>
                );
              })}
            </div>
          )}
        </div>
      </div>
      <article className="px-2 flex flex-col gap-y-4 h-full">
        <div className="flex flex-col gap-y-2 h-full">
          <h2 className="line-clamp-2">{title}</h2>
          <p className="flex flex-row flex-wrap gap-y-2 justify-between mt-auto">
            <span className="text-xs flex items-center gap-x-1 text-ellipsis overflow-hidden whitespace-nowrap capitalize">
              <MdLocationPin className="w-4 h-4 text-primary" /> {location}
            </span>
            <span className="text-xs flex items-center gap-x-1">
              <AiFillStar className="w-4 h-4 text-yellow-500" /> (
              {Math.floor(Math.random() * (5 - 1 + 1)) + 1}) •{" "}
              {Math.floor(Math.random() * (500 - 100 + 1)) + 100}
            </span>
          </p>
        </div>
        <div className="flex flex-col gap-y-4 mt-auto">
          <hr />
          <div className="flex items-center justify-between">
            <span className="text-xs flex items-center gap-x-1">
              <IoMdPricetag className="w-4 h-4 text-primary" />
              <span className="capitalize">${price}/night</span>
            </span>
            <Button
              className="px-4 py-1 text-xs"
              onClick={() =>
                router.push(
                  `/tours/${tour._id}?tour_title=${tour.title
                    .replace(/[^\w\s]|[\s]+/g, "-")
                    .replace(/-+/g, "-")
                    .toLowerCase()}`
                )
              }
            >
              Buy Now
            </Button>
          </div>
        </div>
        <div />
      </article>
    </section>
  );
};

export default Card;
