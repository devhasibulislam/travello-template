/**
 * Title: Write a program using JavaScript on Sidebar
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
 * Date: 15, November 2023
 */

import React from "react";
import routes from "./routes";
import Link from "next/link";
import { HiOutlineHome } from "react-icons/hi2";
import { useRouter } from "next/router";

const Sidebar = () => {
  const router = useRouter();

  const isActive = (href) => {
    return router.pathname === href ? "bg-primary text-white" : "";
  };

  return (
    <section
      className="lg:col-span-3 col-span-5 min-w-full md:max-w-lg max-w-xs h-full overflow-x-hidden z-50 bg-white relative after:content-[''] after:absolute after:h-full after:w-1 after:top-0 after:right-0 after:bg-slate-100 md:block hidden"
      style={{ resize: "horizontal" }}
    >
      <div className="w-full flex flex-col gap-y-2 h-full">
        {routes.map((route, index) => (
          <Link
            key={index}
            href={route.path}
            className={
              "flex flex-row gap-x-2 items-center px-4 py-2 hover:bg-primary hover:text-white transition-colors" +
              " " +
              isActive(route.path)
            }
          >
            {route.icon}
            {route.name}
          </Link>
        ))}
        <Link
          href="/"
          className="mt-auto flex flex-row gap-x-2 items-center px-4 py-2 hover:bg-primary hover:text-white transition-colors"
        >
          <HiOutlineHome className="h-6 w-6" />
          Go to Home
        </Link>
      </div>
    </section>
  );
};

export default Sidebar;
