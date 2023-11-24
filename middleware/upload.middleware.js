/**
 * Title: Write a program using JavaScript on Upload Middleware
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

import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { v2 as cloudinary } from "cloudinary";

/* cloudinary config */
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
  secure: true,
});

// configure multer storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (_, file) => {
    return {
      folder: "travello-template",
      public_id: `${Date.now()}_${file.originalname
        .replace(/[^\w\s.-]/g, "")
        .replace(/\s+/g, "-")
        .toLowerCase()}`,
    };
  },
});

const upload = multer({
  storage,
  fileFilter: (_, file, cb) => {
    const supportedImage = /jpg|jpeg|png/i; // Adjusted regex for case-insensitive matching
    const originalname = file.originalname;
    const extension = originalname.substring(originalname.lastIndexOf(".") + 1);

    if (supportedImage.test(extension)) {
      cb(null, true);
    } else {
      cb(new Error("Must be a png/jpg/jpeg format"));
    }
  },
});

export default upload;
