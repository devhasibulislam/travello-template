/**
 * Title: Write a program using JavaScript on UserMenu
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

import React from "react";
import Search from "../searchTrio/Search";
import LargeDevice from "./LargeDevice";
import Cart from "../cart/Cart";

const UserMenu = () => {
  return (
    <section className="lg:block hidden">
      <div className="flex flex-row items-center gap-x-4">
        <Cart />
        <Search />
        <LargeDevice />
      </div>
    </section>
  );
};

export default UserMenu;
