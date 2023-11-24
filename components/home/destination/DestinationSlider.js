/**
 * Title: Write a program using JavaScript on DestinationSlider
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
 * Date: 23, August 2023
 */

import React, { useState } from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import LoadImage from "@/components/shared/image/LoadImage";

const DestinationSlider = () => {
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
        perView: 2,
        spacing: 15,
      },
      breakpoints: {
        "(max-width: 768px)": {
          slides: {
            perView: 1,
            spacing: 5,
          },
        },
        "(min-width: 769px)": {
          slides: {
            perView: 2,
            spacing: 15,
          },
        },
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
          }, 2000);
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

  const photos = [
    "/assets/static/Popular Destination Banner/1.png",
    "/assets/static/Popular Destination Banner/2.png",
    "/assets/static/Popular Destination Banner/3.png",
    "/assets/static/Popular Destination Banner/4.png",
    "/assets/static/Popular Destination Banner/5.png",
    "/assets/static/Popular Destination Banner/6.png",
  ];

  // Function to get random elements from an array
  function getRandomElements(array, numElements) {
    const shuffledArray = array.sort(() => 0.5 - Math.random());
    return shuffledArray.slice(0, numElements);
  }

  // Select 3 random images from the photos array
  const images = getRandomElements(photos, 3);

  return (
    <section className="lg:col-span-5 md:col-span-6">
      <div className="relative">
        <div ref={sliderRef} className="keen-slider">
          {images.map((image, index) => (
            <div key={index} className="keen-slider__slide">
              <LoadImage
                src={image}
                alt={image}
                height={512}
                width={264}
                className="rounded border border-primary z-50 md:ml-auto mx-auto"
                title="Dimension: 264x512"
              />
            </div>
          ))}
          <div className="absolute bottom-4 right-4 rotate-90">
            {loaded && instanceRef?.current && (
              <div className="flex gap-x-1 py-2.5 justify-center items-center w-full">
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
        <div></div>
      </div>
    </section>
  );
};

export default DestinationSlider;
