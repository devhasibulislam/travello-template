/**
 * Title: Write a program using JavaScript on FooterPayment
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
import React from "react";
import Tooltip from "../../tooltip/Tooltip";
import LoadImage from "../../image/LoadImage";

const FooterPayment = () => {
  const methods = [
    {
      id: 1,
      name: "visa",
      logo: "/assets/payment-methods/visa.svg",
    },
    {
      id: 2,
      name: "mastercard",
      logo: "/assets/payment-methods/mastercard.svg",
    },
    {
      id: 3,
      name: "paypal",
      logo: "/assets/payment-methods/paypal.svg",
    },
    {
      id: 4,
      name: "gapy",
      logo: "/assets/payment-methods/gpay.svg",
    },
  ];

  // function toBase64(str) {
  //   return btoa(unescape(encodeURIComponent(str)));
  // }

  // function shimmer(width, height) {
  //   return `https://placehold.co/${width}x${height}.svg`;
  // }

  return (
    <section>
      <div className="flex flex-col gap-y-2">
        <h2 className="text-lg">Payment Methods</h2>
        <div className="flex flex-row flex-wrap gap-1.5">
          {methods.map(({ id, name, logo }) => (
            <span key={id}>
              <Tooltip text={name}>
                <LoadImage
                  src={logo}
                  alt={name}
                  width={50}
                  height={29}
                  style={{
                    maxWidth: "100%",
                    height: "auto",
                  }}
                  // placeholder="blur"
                  // blurDataURL={`data:image/svg+xml;base64,${toBase64(
                  //   shimmer(50, 29)
                  // )}`}
                />
              </Tooltip>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FooterPayment;
