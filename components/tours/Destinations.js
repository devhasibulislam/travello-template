/**
 * Title: Write a program using JavaScript on Destinations
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
 * Date: 01, November 2023
 */

import React from "react";
import FilterSidebar from "./FilterSidebar";
import Container from "../shared/container/Container";
import FilteredTours from "./FilteredTours";

const Destinations = () => {
  return (
    <Container>
      <section className="grid grid-cols-12 gap-8 py-12 md:relative">
        <FilterSidebar />
        <FilteredTours />
      </section>
    </Container>
  );
};

export default Destinations;
