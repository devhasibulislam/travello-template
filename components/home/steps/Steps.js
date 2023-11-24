/**
 * Title: Write a program using JavaScript on Steps
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
 * Date: 28, September 2023
 */

import Container from "@/components/shared/container/Container";
import HighlightText from "@/components/shared/highlightText/HighlightText";
import LoadImage from "@/components/shared/image/LoadImage";
import React from "react";
import BreakdownArticle from "./BreakdownArticle";
import FeatureTour from "./FeatureTour";

const Steps = () => {
  return (
    <section className="py-12">
      <Container>
        <section className="w-full h-full flex flex-col gap-y-12">
          <div className="flex flex-row justify-between items-center">
            <article className="flex flex-col gap-y-4">
              <h1 className="lg:text-5xl md:text-4xl text-3xl whitespace-normal">
                <HighlightText>Premier</HighlightText> & Simple
                <LoadImage
                  src="/assets/home-page/destination/underline.svg"
                  alt="arrow"
                  height={7}
                  width={275}
                  className="mt-1.5"
                />
              </h1>
              <p className="text-base">
                Your Dream Getaway is Just 3 Steps Away - Book Now With Ease!
              </p>
            </article>
          </div>

          {/* <div className="grid md:items-center gap-12 md:grid-cols-2 grid-cols-1"> */}
          <div className="grid md:items-center gap-8 grid-cols-12">
            <div className="lg:col-span-7 md:col-span-6 col-span-12">
              <BreakdownArticle />
            </div>
            <div className="lg:col-span-5 md:col-span-6 col-span-12">
              <FeatureTour />
            </div>
          </div>
        </section>
      </Container>
    </section>
  );
};

export default Steps;
