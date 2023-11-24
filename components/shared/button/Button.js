/**
 * Title: Write a program using JavaScript on Button
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
 * Date: 16, August 2023
 */

import React from "react";

const Button = ({ children, className, ...rest }) => {
  return (
    <button
      {...rest}
      className={
        "text-sm bg-primary/80 text-white rounded-secondary border-primary border-b-[5px] border-solid hover:bg-primary/90 hover:text-black transition-all delay-100" +
        ` ${className}`
      }
    >
      {children}
    </button>
  );
};

export default Button;
