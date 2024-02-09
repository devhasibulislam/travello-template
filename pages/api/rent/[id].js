/**
 * Title: Write a program using JavaScript on Update Rent
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

import { deleteRent, getRent, updateRent } from "@/controllers/rent.controller";
import authorization from "@/middleware/authorization.middleware";
import upload from "@/middleware/upload.middleware";
import verify from "@/middleware/verify.middleware";

export const config = {
  api: {
    bodyParser: false,
    externalResolver: true,
  },
};

export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case "GET":
      try {
        const result = await getRent(req);
        res.send(result);
      } catch (error) {
        res.send({
          success: false,
          message: error.message,
        });
      }
      break;

    case "PATCH":
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

            upload.array("gallery", 5)(req, res, async (err) => {
              if (err) {
                return res.send({
                  success: false,
                  message: err.message,
                });
              }

              const result = await updateRent(req);
              res.send(result);
            });
          });
        });
      } catch (error) {
        res.send({
          success: false,
          message: error.message,
        });
      }
      break;

    case "DELETE":
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
          });

          const result = await deleteRent(req);

          res.send(result);
        });
      } catch (error) {
        res.send({
          success: false,
          message: error.message,
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
