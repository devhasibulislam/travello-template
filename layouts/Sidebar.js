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
 * Date: 25, January 2024
 */

import LoadImage from "@/components/shared/image/LoadImage";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { IoHomeOutline } from "react-icons/io5";
import { useSelector } from "react-redux";

const Sidebar = ({ routes }) => {
  const router = useRouter();
  const user = useSelector((state) => state?.auth);

  const isActive = (href) => {
    return router.pathname === href ? "bg-primary text-white" : "";
  };

  return (
    <div className="w-full h-full flex flex-col gap-y-2">
      <div className="flex flex-col gap-y-1 overflow-y-auto scrollbar-hide">
        {routes.map((route, index) => (
          <Link
            key={index}
            href={route.path}
            className={
              "flex flex-row gap-x-2 items-center px-4 py-2 hover:bg-primary hover:text-white transition-colors rounded text-sm" +
              " " +
              isActive(route.path)
            }
          >
            {route.icon}
            {route.name}
          </Link>
        ))}
      </div>

      <div className="flex flex-col gap-y-2 mt-auto">
        <div
          className="px-4 py-2 flex flex-row gap-x-2 hover:bg-primary hover:text-white transition-colors rounded cursor-pointer"
          onClick={() => {
            localStorage.removeItem("accessToken");
            window.open("/", "_self");
          }}
        >
          <LoadImage
            src={user?.avatar?.url}
            alt={user?.avatar?.public_id}
            height={30}
            width={30}
            className="rounded-secondary object-cover w-[30px] h-[30px]"
          />
          <article className="flex flex-col gap-y-0.5">
            <h2 className="line-clamp-1 text-base">{user?.name}</h2>
            <span className="text-xs">Logout</span>
          </article>
        </div>
        <Link
          href="/"
          className="flex flex-row gap-x-2 items-center px-4 py-2 hover:bg-primary hover:text-white transition-colors rounded text-sm"
        >
          <IoHomeOutline className="w-4 h-4" />
          Home
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
