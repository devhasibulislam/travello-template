/**
 * Title: Write a program using JavaScript on DestinationDescription
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

// import Image from "next/image";
import HighlightText from "@/components/shared/highlightText/HighlightText";
import LoadImage from "@/components/shared/image/LoadImage";
import React from "react";
// import flight from "/assets/home-page/destination/flight.svg";
// import path from "/assets/home-page/destination/path.svg";
// import lucid from "/assets/home-page/destination/lucid.svg";
// import map from "/assets/home-page/destination/map.svg";

const DestinationDescription = () => {
  // function toBase64(str) {
  //   return btoa(unescape(encodeURIComponent(str)));
  // }

  // function shimmer(width, height) {
  //   return `https://placehold.co/${width}x${height}.svg`;
  // }

  return (
    <section
      className="lg:col-span-7 md:col-span-6 bg-no-repeat bg-contain bg-center h-full"
      style={{
        backgroundImage:
          "url(/assets/home-page/destination/map.svg), url(/assets/home-page/destination/flight.svg), url(/assets/home-page/destination/lucid.svg)",
        backgroundPosition: "50% 30%, 30% 100px, 30% 380px",
        backgroundSize: "80%, 50px, 50px",
      }}
    >
      <div className="w-full h-full flex flex-col justify-center">
        <article className="flex flex-col gap-y-4">
          <h1 className="lg:text-5xl md:text-4xl text-3xl whitespace-normal">
            <HighlightText>Popular</HighlightText> Destinations
            <LoadImage
              src="/assets/home-page/destination/underline.svg"
              alt="arrow"
              height={7}
              width={275}
              className="mt-1.5"
              // placeholder="blur"
              // blurDataURL={`data:image/svg+xml;base64,${toBase64(
              //   shimmer(175, 7)
              // )}`}
            />
          </h1>
          <p className="text-base">
            Here are some of our most popular destinations where you can <br />{" "}
            find our tours and experiences.
          </p>
        </article>
      </div>
    </section>
  );
};

export default DestinationDescription;
