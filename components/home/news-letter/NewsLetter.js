/**
 * Title: Write a program using JavaScript on NewsLetter
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

import Button from "@/components/shared/button/Button";
import Container from "@/components/shared/container/Container";
import LoadImage from "@/components/shared/image/LoadImage";
import React, { useState } from "react";
import { BiHotel } from "react-icons/bi";

const NewsLetter = () => {
  const [showAdditionalContent, setShowAdditionalContent] = useState(false);
  const [visible, setVisible] = useState(false);

  const toggleAdditionalContent = () => {
    setShowAdditionalContent(!showAdditionalContent);
  };

  return (
    <section className="h-full py-12">
      <Container>
        <section className="w-full h-full lg:gap-x-4 gap-y-12 grid grid-cols-12">
          <div className="lg:col-span-5 col-span-12 rounded relative">
            <LoadImage
              src="/assets/static/News Letter.png"
              alt="newsletter"
              height={302}
              width={440}
              className="rounded h-[302px] w-full object-cover border border-primary"
            />
            <div>
              <span
                className="cursor-pointer absolute top-1/3 left-1/3 h-4 w-4 bg-secondary border-2 border-primary rounded-secondary"
                onClick={toggleAdditionalContent}
              />

              {showAdditionalContent && (
                <div className="bg-white flex flex-col gap-y-3 border p-4 rounded absolute top-1/3 left-1/4 mt-5">
                  <article className="flex flex-row gap-x-2">
                    <LoadImage
                      src="/assets/static/News Letter.png"
                      alt="thumbnail"
                      height={35}
                      width={35}
                      className="rounded-[5px] object-cover h-[35px] w-[35px] border border-primary"
                    />
                    <div className="flex flex-col gap-y-1">
                      <h2 className="text-base line-clamp-1">North Atlantic</h2>
                      <p className="flex flex-row gap-x-0.5 items-center text-xs line-clamp-1">
                        <BiHotel className="w-4 h-4 text-primary" /> Hotel of
                        Iceland
                      </p>
                    </div>
                  </article>
                  <p className="text-xs flex flex-row justify-between items-center whitespace-nowrap">
                    <span className="flex flex-row gap-x-0.5 items-baseline">
                      Start from $
                      <span className="text-sm text-primary">120</span>
                    </span>
                    <span className="min-w-[1rem]" />
                    <span className="border px-3 py-0.5 rounded-secondary">
                      2 Days & 2 Nights
                    </span>
                  </p>
                </div>
              )}
            </div>
          </div>
          <div className="lg:col-span-7 col-span-12 bg-secondary/70 rounded relative p-8">
            <LoadImage
              src="/assets/home-page/newsletter/air-ticket.svg"
              alt="ticket"
              height={285}
              width={612}
              className="h-[285px] w-full object-contain absolute lg:-top-4 -top-8 lg:-right-[8rem] md:right-[4rem] -right-[1rem]"
            />
            <LoadImage
              src="/assets/home-page/newsletter/target-circle.svg"
              alt="ticket"
              height={50}
              width={50}
              className="h-[50px] w-[50px] object-contain absolute lg:top-4 md:top-1 lg:left-[9.4rem] md:-left-[0.6rem] -left-[0.4rem]"
            />
            <article className="flex flex-col gap-y-4 h-full">
              <h2 className="lg:text-4xl md:text-2xl text-xl z-50">
                Prepare Yourself & Explore The Beauty Of The World
              </h2>
              <p className="text-sm">
                We&apos;ll send you exclusive offer and sneak peeks of our best
                deals. Plus travel tips and the latest advice on where you can
                go{" "}
              </p>
              <label
                htmlFor="newsletter"
                className="mt-auto flex flex-row gap-x-2 z-50"
              >
                {visible ? (
                  <span className="text-primary drop-shadow">You are Successfully Subscribed!</span>
                ) : (
                  <>
                    <input
                      type="email"
                      name="newsletter"
                      id="newsletter"
                      disabled={visible}
                      placeholder="Enter your email"
                      className="w-full rounded border-1 border-primary text-sm z-50"
                    />
                    <Button
                      className="px-4 py-1 text-xs"
                      onClick={() => setVisible(true)}
                    >
                      Subscribe
                    </Button>
                  </>
                )}
              </label>
            </article>
          </div>
        </section>
      </Container>
    </section>
  );
};

export default NewsLetter;
