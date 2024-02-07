/**
 * Title: Write a program using JavaScript on Purchase
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
 * Date: 24, January 2024
 */

import Purchase from "@/models/purchase.model";
import User from "@/models/user.model";

// add to purchase
export async function addToPurchase(req) {
  try {
    const purchase = await Purchase.create({ ...req.body, user: req.user._id });

    if (purchase) {
      await User.findByIdAndUpdate(req.user._id, {
        $push: {
          purchases: purchase._id,
        },
      });

      return {
        success: true,
        message: "Successfully added to purchase",
      };
    } else {
      return {
        success: false,
        message: "Failed to add to purchase",
      };
    }
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
}

// get purchase
export async function getPurchases() {
  try {
    const purchase = await Purchase.find().populate(["user", "rent"]);

    if (purchase) {
      return {
        success: true,
        message: "Successfully fetch purchases",
        data: purchase,
      };
    } else {
      return {
        success: false,
        message: "Failed to fetch purchases",
      };
    }
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
}
