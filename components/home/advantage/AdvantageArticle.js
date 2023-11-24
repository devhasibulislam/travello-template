/**
 * Title: Write a program using JavaScript on AdvantageArticle
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
 * Date: 30, August 2023
 */

import LoadImage from "@/components/shared/image/LoadImage";
import React from "react";

const AdvantageArticle = () => {
  const items = [
    {
      _id: 1,
      icon: (
        <LoadImage
          src={"/assets/home-page/advantage/earth.svg"}
          alt={"earth"}
          height={60}
          width={60}
          className="border border-primary shadow-lg rounded-full"
        />
      ),
      title: "Safe, Fun & Unique Experience",
      description:
        "Your safety and the amount of fun you have with us is our top priority. You will be treated like family and enjoy a once in a lifetime experience that you will never forget.",
    },
    {
      _id: 2,
      icon: (
        <LoadImage
          src={"/assets/home-page/advantage/smile.svg"}
          alt={"smile"}
          height={60}
          width={60}
          className="border border-primary shadow-lg rounded-full"
        />
      ),
      title: "Over 10,000 Happy Guests",
      description:
        "Don’t just take our word for it. Feel free to read online review from thousands of our happy guests that loves our tours. Our guests always come first.",
    },
    {
      _id: 3,
      icon: (
        <LoadImage
          src={"/assets/home-page/advantage/star.svg"}
          alt={"star"}
          height={60}
          width={60}
          className="border border-primary shadow-lg rounded-full"
        />
      ),
      title: "All-Inclusive Tours",
      description:
        "Our tours are 100% stress-free so you can fully enjoy your experience. Once paid you don’t have to worry about being nickel and dimed along the way. Leave your wallet at home.",
    },
  ];

  return (
    <article className="flex flex-col gap-y-8">
      <h2 className="lg:text-4xl md:text-3xl text-2xl">
        To Explore The New Adventure
        <LoadImage
          src={"/assets/home-page/advantage/line.svg"}
          alt={"line"}
          height={10}
          width={150}
          className="mt-1.5"
        />
      </h2>
      <div className="flex flex-col gap-y-4">
        {items.map(({ _id, icon, title, description }) => (
          <div
            key={_id}
            className="flex gap-x-2 items-start bg-white/70 shadow p-primary rounded-primary"
          >
            {icon}
            <div className="w-full flex flex-col gap-y-1">
              <h2 className="text-lg">{title}</h2>
              <p className="text-sm lg:line-clamp-none md:line-clamp-2 line-clamp-none">
                {description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </article>
  );
};

export default AdvantageArticle;
