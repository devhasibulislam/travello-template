/**
 * Title: Write a program using JavaScript on CartCard
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
 * Date: 19, November 2023
 */

import React from "react";

const CartCard = () => {
  return (
    <div className="flex flex-col gap-y-4">
      <div className="h-8 w-8 rounded bg-gray-200 animate-pulse" />
      <div className="flex flex-col gap-y-2">
        <div className="h-6 w-full rounded bg-gray-200 animate-pulse" />
        <div className="h-3 w-3/4 rounded bg-gray-200 animate-pulse" />
        <div className="flex gap-x-2 items-center">
          <div className="w-5 h-5 rounded-secondary bg-gray-200 animate-pulse" />
          <div className="w-2/5 h-4 rounded bg-gray-200 animate-pulse" />
        </div>
      </div>
    </div>
  );
};

export default CartCard;
