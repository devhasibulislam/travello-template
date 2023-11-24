/**
 * Title: Write a program using JavaScript on Rent CRUD
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
 * Date: 18, November 2023
 */

import {
    getFilteredRents,
  } from "@/controllers/rent.controller";
  
  export const config = {
    api: {
      bodyParser: true,
      externalResolver: true,
    },
  };
  
  export default async function handler(req, res) {
    switch (req.method) {
      case "PATCH":
        try {
          const result = await getFilteredRents(req);
          res.send(result);
        } catch (error) {
          res.send({
            success: false,
            error: error.message,
          });
        }
        break;
  
      default:
        res.send({
          success: false,
          message: "Method not allowed",
        });
        break;
    }
  }
  