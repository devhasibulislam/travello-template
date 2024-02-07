/**
 * Title: Write a program using JavaScript on Modal
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
 * Date: 18, August 2023
 */

import React from "react";

const Modal = ({ isOpen, onClose, children, className }) => {
  if (!isOpen) return null;

  return (
    <section className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="fixed inset-0 bg-secondary/10 backdrop-blur-sm backdrop-filter bg-opacity-100"
        onClick={onClose}
      ></div>
      <div
        className={
          "z-10 bg-white rounded p-secondary shadow-lg border border-primary mx-4 h-96 overflow-y-auto scrollbar-hide lg:w-1/2 md:w-3/5 w-full" +
          ` ${className}`
        }
      >
        {children}
      </div>
    </section>
  );
};

export default Modal;
