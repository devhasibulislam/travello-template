/**
 * Title: Write a program using JavaScript on FooterLogo
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
import Logo from "../../logo/Logo";
import FooterPayment from "./FooterPayment";

const FooterLogo = () => {
  return (
    <section>
      <article className="flex md:flex-col md:justify-normal md:items-start flex-row justify-between items-center gap-y-4">
        <Logo />
        <p className="text-xs md:block hidden">
          Perfect for all kinds of travel agency. Including tours, hotel
          booking, activity/event, travel experiences, online booking, room bnb,
          villa rental, holiday rental, resort rental, cruises, car rentals,
          real estate, flight ticket, and more.
        </p>
        <div className="lg:hidden block">
          <FooterPayment />
        </div>
      </article>
    </section>
  );
};

export default FooterLogo;
