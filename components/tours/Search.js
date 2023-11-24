/**
 * Title: Write a program using JavaScript on Search
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
import { BiSearchAlt } from "react-icons/bi";

const Search = () => {
  return (
    <section className="lg:w-1/3 md:w-3/4 w-full mx-auto flex flex-row gap-x-2">
      <input
        type="search"
        name="search"
        id="search"
        placeholder="Search Destinations Here..."
        className="w-full !rounded-secondary px-4 form-input border-1 border-primary"
      />
      <button className="rounded-secondary border border-primary bg-white flex flex-row justify-center items-center px-2">
        <BiSearchAlt className="h-6 w-6" />
      </button>
    </section>
  );
};

export default Search;
