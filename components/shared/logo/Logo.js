/**
 * Title: Write a program using JavaScript on Logo
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
import { useRouter } from "next/router";
import React from "react";
import LoadImage from "../image/LoadImage";

const Logo = () => {
  const router = useRouter();

  // function toBase64(str) {
  //   return btoa(unescape(encodeURIComponent(str)));
  // }

  // function shimmer(width, height) {
  //   return `https://placehold.co/${width}x${height}.svg`;
  // }

  return (
    <>
      <LoadImage
        src="/assets/logo.svg"
        alt="logo"
        // placeholder="blur"
        // blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(60, 50))}`}
        /**
         * 1st Parameter: Width
         * 2nd Parameter: Height
         */
        title="logo"
        width={60}
        height={50}
        style={{
          maxWidth: "100%",
          height: "auto",
        }}
        onClick={() => router.push("/")}
        className="cursor-pointer object-center max-w-full"
      />
    </>
  );
};

export default Logo;
