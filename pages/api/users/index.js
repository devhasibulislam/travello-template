/**
 * Title: Write a program using JavaScript on get all users
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
 * Date: 17, November 2023
 */

import { getUsers } from "@/controllers/user.controller";
import authorization from "@/middleware/authorization.middleware";
import verify from "@/middleware/verify.middleware";

export const config = {
  api: {
    externalResolver: true,
  },
};

export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case "GET":
      try {
        verify(req, res, async (err) => {
          if (err) {
            return res.send({
              success: false,
              error: err.message,
            });
          }

          authorization("admin", "user")(req, res, async (err) => {
            if (err) {
              return res.send({
                success: false,
                error: err.message,
              });
            }

            const result = await getUsers();
            res.send(result);
          });
        });
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
        error: "Method not allowed",
      });
      break;
  }
}
