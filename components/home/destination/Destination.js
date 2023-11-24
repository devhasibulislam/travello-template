/**
 * Title: Write a program using JavaScript on Destination
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

import Container from "@/components/shared/container/Container";
import React from "react";
import DestinationDescription from "./DestinationDescription";
import DestinationSlider from "./DestinationSlider";

const Destination = () => {
  return (
    <section className="py-12">
      <Container>
        <div className="grid md:grid-cols-12 md:items-center gap-12 grid-cols-1">
            <DestinationDescription/>
            <DestinationSlider/>
        </div>
      </Container>
    </section>
  );
};

export default Destination;
