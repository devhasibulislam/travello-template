/**
 * Title: Write a program using JavaScript on PopularDestination
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

import Container from "@/components/shared/container/Container";
import HighlightText from "@/components/shared/highlightText/HighlightText";
import LoadImage from "@/components/shared/image/LoadImage";
import React from "react";
import DestinationByMonth from "./DestinationByMonth";

const PopularDestination = () => {
  return (
    <section
      className="bg-no-repeat bg-cover h-full py-12"
      style={{
        backgroundImage: "url(/assets/home-page/popular-destination/bg.svg)",
        // backgroundPosition: "125% 80%",
        // backgroundSize: "100% 100%",
      }}
    >
      <Container>
        <section id="hotels" className="w-full h-full flex flex-col gap-y-12">
          <div className="flex flex-col gap-y-12">
            <article className="flex flex-col gap-y-4">
              <h1 className="lg:text-5xl md:text-4xl text-3xl whitespace-normal">
                <HighlightText>Destinations</HighlightText> By Month
                <LoadImage
                  src="/assets/home-page/destination/underline.svg"
                  alt="arrow"
                  height={7}
                  width={275}
                  className="mt-1.5"
                />
              </h1>
              <p className="text-base">
                Here are some of our popular tours across all of our
                destinations
              </p>
            </article>

            <DestinationByMonth />
          </div>
        </section>
      </Container>
    </section>
  );
};

export default PopularDestination;
