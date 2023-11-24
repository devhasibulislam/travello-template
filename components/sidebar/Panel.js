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
 * Date: 15, November 2023
 */

import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Container from "../shared/container/Container";
import { CgMenuRight, CgMenuLeft } from "react-icons/cg";
import { RxCross2 } from "react-icons/rx";
import LoadImage from "../shared/image/LoadImage";
import Link from "next/link";
import { HiOutlineHome } from "react-icons/hi2";
import routes from "./routes";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

const Panel = ({ children }) => {
  const router = useRouter();
  const [showSidebar, setShowSidebar] = useState(false);
  const user = useSelector((state) => state?.user);

  const isActive = (href) => {
    return router.pathname === href ? "bg-primary text-white" : "";
  };

  return (
    <section className="h-[calc(100vh-80px)] p-4">
      <Container className="py-4 h-full flex flex-col gap-y-4">
        <div className="border px-4 py-2.5 flex flex-row items-center justify-between rounded">
          <button
            className="border p-2 rounded-secondary md:hidden"
            onClick={() => setShowSidebar(!showSidebar)}
          >
            {showSidebar ? (
              <CgMenuRight className="h-6 w-6" />
            ) : (
              <CgMenuLeft className="h-6 w-6" />
            )}
          </button>
          <div />
          <div className="flex flex-row items-center gap-x-4">
            <LoadImage
              src={user?.avatar?.url || "https://placehold.co/50x50.svg"}
              alt={user?.avatar?.public_id || "avatar"}
              height={40}
              width={40}
              className="rounded-secondary w-[40px] h-[40px] order-2"
            />
            <article className="order-1 text-right md:block hidden">
              <h2 className="text-base"><span className="text-xs uppercase">{user?.role}</span> • {user?.name}</h2>
              <p className="text-sm">{user?.email}</p>
            </article>
          </div>
        </div>
        <section className="grid grid-cols-12 gap-4 h-full w-full relative">
          <Sidebar />
          <div className="lg:col-span-9 md:col-span-7 col-span-12 overflow-y-auto">
            {children}
          </div>

          {showSidebar && (
            <section className="border rounded absolute top-0 left-0 w-3/4 h-full z-50 bg-white">
              <button
                className="border p-1 rounded-secondary absolute  top-0 -right-10 bg-red-500 text-white"
                onClick={() => setShowSidebar(false)}
              >
                <RxCross2 className="h-6 w-6" />
              </button>

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
          )}
        </section>
      </Container>
    </section>
  );
};

export default Panel;
