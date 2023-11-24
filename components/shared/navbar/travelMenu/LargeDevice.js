/**
 * Title: Write a program using JavaScript on LargeDevice
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

const LargeDevice = () => {
  const items = [
    {
      id: 1,
      name: "Home",
      href: "/",
    },
    {
      id: 2,
      name: "Flights",
      href: "#flights",
    },
    {
      id: 3,
      name: "Hotels",
      href: "#hotels",
    },
    {
      id: 4,
      name: "Deals",
      href: "#deals",
    },
    {
      id: 5,
      name: "Blogs",
      href: "#blogs",
    },
    {
      id: 6,
      name: "Dashboard",
      href: "/dashboard",
    },
  ];

  return (
    <section>
      <div className="flex flex-row gap-x-4">
        {items.map(({ id, name, href }) => (
          <Link key={id} href={href} className="text-sm">
            {name}
          </Link>
        ))}
      </div>
    </section>
  );
};

export default LargeDevice;
