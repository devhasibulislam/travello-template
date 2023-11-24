/**
 * Title: Write a program using JavaScript on BannerSlider
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
 * Date: 16, August 2023
 */

import React, { useState } from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import LoadImage from "@/components/shared/image/LoadImage";

const HeroSlider = () => {
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
        spacing: 5,
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

  const images = [
    "/assets/static/Hero Banners/1.png",
    "/assets/static/Hero Banners/2.png",
    "/assets/static/Hero Banners/3.png",
  ];

  return (
    <section className="lg:col-span-4 md:col-span-6">
      <div className="relative">
        <div ref={sliderRef} className="keen-slider">
          {images.map((image, index) => (
            <div key={index} className="keen-slider__slide">
              <LoadImage
                src={image}
                alt={`Image ${index + 1}`}
                height={512}
                width={364}
                className="rounded border border-primary md:ml-auto mx-auto"
                title="Dimension: 364x512"
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
      </div>
    </section>
  );
};

export default HeroSlider;
