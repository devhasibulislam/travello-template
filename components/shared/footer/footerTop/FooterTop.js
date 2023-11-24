/**
 * Title: Write a program using JavaScript on FooterTop
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
import FooterLogo from "./FooterLogo";
import FooterItems from "./FooterItems";
import FooterPayment from "./FooterPayment";

const FooterTop = () => {
  return (
    <section>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">
        <FooterLogo />
        <FooterItems />
        <section className="lg:block hidden">
          <FooterPayment />
        </section>
      </div>
    </section>
  );
};

export default FooterTop;
