/**
 * Title: Write a program using JavaScript on Banner
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
 * Date: 24, August 2023
 */

import Container from "@/components/shared/container/Container";
import React from "react";
import HeroDescription from "./HeroDescription";
import HeroSlider from "./HeroSlider";

const Hero = () => {
  return (
    <section
      className="py-12 bg-no-repeat bg-cover bg-bottom"
      style={{
        backgroundImage: "url(/assets/home-page/banner/bannerBg.svg)",
      }}
    >
      <Container>
        <div className="flex flex-col gap-y-12">
          <div className="grid md:grid-cols-12 md:items-center gap-12 grid-cols-1">
            <HeroDescription />
            <HeroSlider />
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Hero;
