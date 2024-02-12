/**
 * Title: Write a program using JavaScript on Panel
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
 * Date: 24, January 2024
 */

import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import Sidebar from "./Sidebar";
import { IoHomeOutline } from "react-icons/io5";
import {
  MdFavoriteBorder,
  MdOutlineAddHomeWork,
  MdOutlineRateReview,
} from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import { HiMenuAlt4 } from "react-icons/hi";
import { FiUsers } from "react-icons/fi";
import { PiCreditCardLight, PiCubeTransparent } from "react-icons/pi";
import { AiOutlineUserSwitch } from "react-icons/ai";
import { TbUserEdit, TbUserShare } from "react-icons/tb";
import { BsCartCheck } from "react-icons/bs";

const Panel = ({ children }) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const routes = [
    {
      name: "My Profile",
      path: "/dashboard/my-profile",
      icon: <TbUserEdit className="w-5 h-5" />,
    },
    {
      name: "Add Rent",
      path: "/dashboard/add-rent",
      icon: <MdOutlineAddHomeWork className="w-5 h-5" />,
    },
    {
      name: "List Rents",
      path: "/dashboard/list-rents",
      icon: <PiCubeTransparent className="w-5 h-5" />,
    },
    {
      name: "View Cart",
      path: "/dashboard/view-cart",
      icon: <BsCartCheck className="w-5 h-5" />,
    },
    {
      name: "View Favorites",
      path: "/dashboard/view-favorites",
      icon: <MdFavoriteBorder className="w-5 h-5" />,
    },
    {
      name: "View Purchases",
      path: "/dashboard/view-purchases",
      icon: <PiCreditCardLight className="w-5 h-5" />,
    },
    {
      name: "List Buyers",
      path: "/dashboard/list-buyers",
      icon: <AiOutlineUserSwitch className="w-5 h-5" />,
    },
    {
      name: "List Sellers",
      path: "/dashboard/list-sellers",
      icon: <TbUserShare className="w-5 h-5" />,
    },
    {
      name: (
        <p className="text-black flex flex-row gap-x-2 items-center w-full h-fit">
          List Users{" "}
          <span
            className="border border-cyan-900 text-cyan-900 bg-cyan-100/50 px-1.5 py-0 rounded uppercase"
            style={{ fontSize: "10px" }}
          >
            admin
          </span>
        </p>
      ),
      path: "/dashboard/list-users",
      icon: <FiUsers className="w-5 h-5" />,
    },
    {
      name: "View Reviews",
      path: "/dashboard/view-reviews",
      icon: <MdOutlineRateReview className="w-5 h-5" />,
    },
  ];

  return (
    <section className="h-screen w-screen">
      <div className="max-w-7xl mx-auto h-full flex flex-col gap-y-4 p-2">
        <nav className="px-4 py-2.5 flex flex-row items-center justify-between gap-x-2 rounded">
          <p className="flex flex-row items-center gap-x-2 text-sm capitalize whitespace-nowrap overflow-x-auto scrollbar-hide text-ellipsis">
            <Link href="/">
              <IoHomeOutline className="h-5 w-5" />
            </Link>
            {router?.route?.split("/")?.map((route, index) => (
              <React.Fragment key={index}>
                {index > 0 && " / "}
                <Link href={index === 1 ? `/dashboard` : `/dashboard/${route}`}>
                  {index === 1 ? "Dashboard" : route.split("-").join(" ")}
                </Link>
              </React.Fragment>
            ))}
          </p>

          {open ? (
            <>
              <button
                className="lg:hidden md:hidden border p-1 rounded-secondary"
                onClick={() => setOpen(!open)}
              >
                <RxCross2 className="h-5 w-5" />
              </button>
            </>
          ) : (
            <>
              <button
                className="lg:hidden md:hidden border p-1 rounded-secondary"
                onClick={() => setOpen(!open)}
              >
                <HiMenuAlt4 className="h-5 w-5" />
              </button>
            </>
          )}
        </nav>

        <div className="h-full overflow-y-auto scrollbar-hide grid grid-cols-12 gap-x-4 relative">
          <aside className="lg:col-span-3 md:col-span-4 col-span-12 md:block hidden overflow-y-auto bg-secondary rounded p-2">
            <Sidebar routes={routes} />
          </aside>
          <section className="lg:col-span-9 md:col-span-8 col-span-12 overflow-y-auto">
            {children}
          </section>

          {open && (
            <div className="lg:hidden md:hidden block absolute top-0 left-0 w-3/4 h-full bg-secondary overflow-y-auto scrollbar-hide z-50 rounded p-2">
              <Sidebar routes={routes} />
            </div>
          )}
        </div>

        <footer className="px-4 py-2 flex justify-center items-center flex-row rounded">
          <p className="text-xs">
            © {new Date().getFullYear()} Travello eBooking. All rights reserved.
          </p>
        </footer>
      </div>
    </section>
  );
};

export default Panel;
