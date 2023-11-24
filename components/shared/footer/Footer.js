/**
 * Title: Write a program using JavaScript on Footer
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
import FooterTop from "./footerTop/FooterTop";
import Container from "../container/Container";
import FooterBottom from "./footerBottom/FooterBottom";

const Footer = () => {
  return (
    <footer className="bg-secondary py-8">
      <Container>
        <div className="flex flex-col gap-y-8">
          <FooterTop />
          <hr className="border-primary" />
          <FooterBottom />
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
