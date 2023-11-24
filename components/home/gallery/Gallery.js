/**
 * Title: Write a program using JavaScript on Gallery
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
 * Date: 07, October 2023
 */

import Container from "@/components/shared/container/Container";
import HighlightText from "@/components/shared/highlightText/HighlightText";
import LoadImage from "@/components/shared/image/LoadImage";
import React, { useRef, useState } from "react";
import { BiDownArrowAlt, BiUpArrowAlt } from "react-icons/bi";

const Gallery = () => {
  const images = [
    "/assets/static/Gallery Explorer/1.png",
    "/assets/static/Gallery Explorer/2.png",
    "/assets/static/Gallery Explorer/3.png",
    "/assets/static/Gallery Explorer/4.png",
    "/assets/static/Gallery Explorer/5.png",
    "/assets/static/Gallery Explorer/6.png",
    "/assets/static/Gallery Explorer/7.png",
    "/assets/static/Gallery Explorer/8.png",
    "/assets/static/Gallery Explorer/9.png",
    "/assets/static/Gallery Explorer/10.png",
    "/assets/static/Gallery Explorer/11.png",
    "/assets/static/Gallery Explorer/4.png",
    "/assets/static/Gallery Explorer/5.png",
    "/assets/static/Gallery Explorer/6.png",
    "/assets/static/Gallery Explorer/7.png",
    "/assets/static/Gallery Explorer/8.png",
    "/assets/static/Gallery Explorer/12.png",
    "/assets/static/Gallery Explorer/18.png",
    "/assets/static/Gallery Explorer/19.png",
    "/assets/static/Gallery Explorer/11.png",
    "/assets/static/Gallery Explorer/13.png",
    "/assets/static/Gallery Explorer/14.png",
    "/assets/static/Gallery Explorer/15.png",
    "/assets/static/Gallery Explorer/16.png",
    "/assets/static/Gallery Explorer/8.png",
    "/assets/static/Gallery Explorer/9.png",
    "/assets/static/Gallery Explorer/10.png",
    "/assets/static/Gallery Explorer/15.png",
    "/assets/static/Gallery Explorer/16.png",
    "/assets/static/Gallery Explorer/17.png",
    "/assets/static/Gallery Explorer/12.png",
    "/assets/static/Gallery Explorer/13.png",
    "/assets/static/Gallery Explorer/14.png",
    "/assets/static/Gallery Explorer/20.png",
  ];

  function shuffleArray(array) {
    const shuffledArray = array.slice(); // Create a copy of the original array
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [
        shuffledArray[j],
        shuffledArray[i],
      ];
    }
    return shuffledArray;
  }

  const shuffledImages = shuffleArray(images);

  const items = [
    {
      title: "City",
      images: 17,
    },
    {
      title: "Foods",
      images: 27,
    },
    {
      title: "Hotel",
      images: 21,
    },
    {
      title: "Forest",
      images: 33,
    },
    {
      title: "Mountains",
      images: 30,
    },
    {
      title: "Sea Beaches",
      images: 31,
    },
  ];

  const [tab, setTab] = useState("Forest");
  const [counter, setCounter] = useState(9);
  const containerRef = useRef(null);

  return (
    <section id="deals" className="h-full py-12">
      <Container>
        <section className="w-full h-full flex flex-col gap-y-12">
          <div className="flex flex-col gap-y-12">
            <article className="flex flex-col gap-y-4">
              <h1 className="lg:text-5xl md:text-4xl text-3xl whitespace-normal">
                <HighlightText>Gallery</HighlightText> Explorer
                <LoadImage
                  src="/assets/home-page/destination/underline.svg"
                  alt="arrow"
                  height={7}
                  width={275}
                  className="mt-1.5"
                />
              </h1>
              <p className="text-base">
                Featured photos based on foods, sea-beaches, mountains, forest,
                hotels and so on.
              </p>
            </article>
          </div>

          <div className="border border-primary/30 rounded-2xl  bg-secondary/30 lg:p-12 md:p-6 p-3">
            <div className="flex flex-col gap-y-8">
              <div className="flex flex-row flex-wrap gap-4">
                {items.map((item, index) => (
                  <span
                    key={index}
                    className={
                      "border border-primary px-4 py-1 rounded-secondary text-sm hover:bg-primary hover:border-secondary hover:text-white transition-colors cursor-pointer" +
                      " " +
                      (tab === item.title
                        ? "bg-primary border-secondary text-white"
                        : "")
                    }
                    onClick={() => {
                      setTab(item.title);
                      setCounter(item.images);
                    }}
                  >
                    {item.title}
                  </span>
                ))}
              </div>
              <div className="relative">
                <div
                  className="grid grid-cols-12 items-center gap-4 h-[720px] overflow-y-hidden scrollbar-hide"
                  ref={containerRef}
                >
                  {shuffledImages.slice(0, counter).map((image, index) => (
                    <LoadImage
                      key={index}
                      src={image}
                      alt={`Image ${index + 1}`}
                      height={(index + 1) % 2 === 0 ? 364 : 159}
                      width={267}
                      className={`lg:col-span-3 md:col-span-6 col-span-12 border w-full object-cover border-primary/30 drop-shadow rounded ${
                        (index + 1) % 2 === 0
                          ? "row-span-2 h-[364px]"
                          : "h-[159px]"
                      }`}
                      title={
                        "Dimension:" + " " + ((index + 1) % 2) === 0 ? 364 : 159
                      }
                    />
                  ))}

                  <div className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t from-secondary/50 via-secondary/10 to-transparent"></div>
                </div>
                <div className="absolute top-4 right-4 flex flex-col gap-y-2">
                  <span
                    className="p-1.5 border border-primary rounded-secondary bg-secondary hover:bg-primary hover:border-secondary hover:text-white transition-colors cursor-pointer"
                    onClick={() => {
                      {
                        const container = containerRef.current;
                        const scrollAmount = -512;

                        container.scrollBy({
                          top: scrollAmount,
                          behavior: "smooth",
                        });
                      }
                    }}
                  >
                    <BiUpArrowAlt className="h-6 w-6" />
                  </span>
                  <span
                    className="p-1.5 border border-primary rounded-secondary bg-secondary hover:bg-primary hover:border-secondary hover:text-white transition-colors cursor-pointer"
                    onClick={() => {
                      {
                        const container = containerRef.current;
                        const scrollAmount = 512;

                        container.scrollBy({
                          top: scrollAmount,
                          behavior: "smooth",
                        });
                      }
                    }}
                  >
                    <BiDownArrowAlt className="h-6 w-6" />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Container>
    </section>
  );
};

export default Gallery;
