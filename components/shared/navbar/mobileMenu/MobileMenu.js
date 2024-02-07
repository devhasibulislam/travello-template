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
import MenuItems from "./MenuItems";
import LoadImage from "../../image/LoadImage";
import { useSelector } from "react-redux";
import { HiOutlineUser } from "react-icons/hi";

const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const user = useSelector((state) => state?.auth);

  return (
    <div className="relative">
      <button
        className="p-1.5 shadow rounded border-primary/20 border"
        onClick={() => setIsOpen(!isOpen)}
      >
        <HiOutlineUser className="text-lg" />
      </button>
      <MenuItems isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
};

export default MobileMenu;
