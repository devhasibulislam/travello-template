/**
 * Title: Write a program using JavaScript on 404
 * Author: Hasibul Islam
 * Portfolio: https://devhasibulislam.vercel.app
 * Linkedin: https://linkedin.com/in/devhasibulislam
 * GitHub: https://github.com/in/devhasibulislam
 * Facebook: https://facebook.com/in/devhasibulislam
 * Instagram: https://instagram.com/in/devhasibulislam
 * Twitter: https://twitter.com/in/devhasibulislam
 * Pinterest: https://pinterest.com/in/devhasibulislam
 * WhatsApp: https://wa.me/8801906315901
 * Telegram: devhasibulislam
 * Date: 15, August 2023
 */

import Link from "next/link";
import React from "react";
import { BiErrorCircle } from "react-icons/bi";

const NotFound = () => {
  return (
    <section className="flex flex-col items-center justify-center gap-y-4 fixed top-0 left-0 w-screen h-screen bg-secondary">
      <h1 className="md:text-4xl text-2xl font-semibold text-gray-800 text-center">
        <BiErrorCircle className="text-6xl" />
      </h1>
      <div className="flex flex-col items-center gap-y-2">
        <h1 className="md:text-4xl text-2xl font-semibold text-gray-800 text-center">
          404 - Page Not Found
        </h1>
        <p className="text-gray-600 text-center">
          The page you are looking for does not exist.
        </p>
      </div>
      <Link
        href="/"
        className="px-secondary py-2 shadow hover:bg-primary hover:text-white rounded-primary"
      >
        Go back to Home
      </Link>
    </section>
  );
};

export default NotFound;
