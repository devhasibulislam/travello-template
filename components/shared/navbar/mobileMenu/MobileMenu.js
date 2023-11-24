/**
 * Title: Write a program using JavaScript on MobileMenu
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

// import Image from "next/image";
import React, { useState } from "react";
import { FaBars } from "react-icons/fa";
import MenuItems from "./MenuItems";
import LoadImage from "../../image/LoadImage";

const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  // function toBase64(str) {
  //   return btoa(unescape(encodeURIComponent(str)));
  // }

  // function shimmer(width, height) {
  //   return `https://placehold.co/${width}x${height}.svg`;
  // }

  return (
    <section className="lg:hidden z-50">
      <div className="relative">
        <button
          className="px-2 py-1 shadow rounded-secondary border-primary/20 border flex items-center gap-x-2"
          onClick={() => setIsOpen(!isOpen)}
        >
          <LoadImage
            src="https://placehold.co/24x24.png"
            alt="avatar"
            width={24}
            height={24}
            title="avatar"
            className="rounded-secondary w-6 h-6 border border-primary/20"
            // placeholder="blur"
            // blurDataURL={`data:image/svg+xml;base64,${toBase64(
            //   shimmer(24, 24)
            // )}`}
          />
          <FaBars className="text-lg" />
        </button>
        <MenuItems isOpen={isOpen} setIsOpen={setIsOpen} />
      </div>
    </section>
  );
};

export default MobileMenu;
