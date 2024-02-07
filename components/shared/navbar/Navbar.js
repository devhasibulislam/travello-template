/**
 * Title: Write a program using JavaScript on Navbar
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

import React from "react";
import Logo from "../logo/Logo";
import Container from "../container/Container";
import UserMenu from "./userMenu/UserMenu";

const Navbar = () => {
  return (
    <header className="bg-secondary">
      <Container>
        <nav className="py-4">
          <section className="flex flex-row justify-between items-center">
            <Logo />
            <UserMenu />
          </section>
        </nav>
      </Container>
    </header>
  );
};

export default Navbar;
