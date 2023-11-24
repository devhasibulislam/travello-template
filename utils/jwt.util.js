/**
 * Title: Write a program using JavaScript on Jwt Util
 * Author: Hasibul Islam
 * Portfolio: https://devhasibulislam.vercel.app
 * Linkedin: https://linkedin.com/in/devhasibulislam
 * GitHub: https://github.com/devhasibulislam
 * Facebook: https://facebook.com/devhasibulislam
 * Instagram: https:/instagram.com/devhasibulislam
 * Twitter: https://twitter.com/devhasibulislam
 * Pinterest: https://pinterest.com/devhasibulislam
 * WhatsApp: https://wa.me/8801906315901
 * Telegram: devhasibulislam
 * Date: 16, November 2023
 */

import jwt from "jsonwebtoken";

export default function generateAccessToken({ _id, name, email, role }) {
  const token = jwt.sign(
    {
      _id,
      name,
      email,
      role,
    },
    process.env.TOKEN_SECRET
  );

  return token;
}
