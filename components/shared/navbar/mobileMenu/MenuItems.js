/**
 * Title: Write a program using JavaScript on MenuItems
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
import OutsideClick from "../../outsideClick/OutsideClick";
import { useSelector } from "react-redux";

const MenuItems = ({ isOpen, setIsOpen }) => {
  const user = useSelector((state) => state?.auth);
  const handleOutsideClick = () => {
    setIsOpen(!isOpen);
  };

  const menuItems = [
    {
      id: 1,
      name: "Dashboard",
      href: "/dashboard",
    },
  ];

  const userItems = [
    {
      id: 2,
      name: "Sign Up",
      href: "/auth/signup",
    },
    {
      id: 3,
      name: "Sign In",
      href: "/auth/signin",
    },
  ];

  return (
    isOpen && (
      <OutsideClick onOutsideClick={handleOutsideClick}>
        <section className="absolute top-full right-0 w-40 mt-2 z-50">
          <div className="w-full h-full bg-secondary shadow rounded border border-primary/20">
            <div className="flex flex-col gap-y-3 py-primary">
              {Object.keys(user).length > 0 && (
                <>
                  <div className="flex flex-col gap-y-2 px-secondary">
                    {menuItems.map(({ id, name, href }) => (
                      <Link
                        key={id}
                        href={href}
                        className="flex justify-between group text-sm"
                      >
                        {name}{" "}
                        <span className="group-hover:opacity-100 opacity-5 font-bold">
                          →
                        </span>
                      </Link>
                    ))}
                  </div>
                  <hr className="border-primary/20" />
                </>
              )}
              <div className="flex flex-col gap-y-2 px-secondary">
                {localStorage.getItem("accessToken") &&
                Object.keys(user).length > 0 ? (
                  <button
                    type="button"
                    className="flex justify-between group text-sm"
                    onClick={() => {
                      localStorage.removeItem("accessToken");
                      window.location.reload();
                    }}
                  >
                    Logout{" "}
                    <span className="group-hover:opacity-100 opacity-5 font-bold">
                      →
                    </span>
                  </button>
                ) : (
                  userItems.map(({ id, name, href }) => (
                    <Link
                      key={id}
                      href={href}
                      className="flex justify-between group text-sm"
                    >
                      {name}{" "}
                      <span className="group-hover:opacity-100 opacity-5 font-bold">
                        →
                      </span>
                    </Link>
                  ))
                )}
              </div>
            </div>
          </div>
        </section>
      </OutsideClick>
    )
  );
};

export default MenuItems;
