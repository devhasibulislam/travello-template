/**
 * Title: Write a program using JavaScript on Favorite Controller
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
 * Date: 24, January 2024
 */

import Favorite from "@/models/favorite.model";
import User from "@/models/user.model";

// add to favorite
export async function addToFavorite(req) {
  try {
    const favorite = await Favorite.findOne({ user: req.user._id });
    let result = {};

    if (favorite) {
      result = await Favorite.findOneAndUpdate(
        { user: req.user._id },
        {
          $push: { rents: req.body.rent },
        }
      );
    } else {
      result = await Favorite.create({
        user: req.user._id,
        rents: [req.body.rent],
      });

      await User.findByIdAndUpdate(req.user._id, {
        $set: {
          favorite: result._id,
        },
      });
    }

    if (result) {
      return {
        success: true,
        message: "Successfully added to favorite",
      };
    } else {
      return {
        success: false,
        message: "Failed to add to favorite",
      };
    }
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
}

// get favorite
export async function getFavorites() {
  try {
    const favorite = await Favorite.find().populate([
      "user",
      {
        path: "rents",
        populate: ["owner"],
      },
    ]);

    if (favorite) {
      return {
        success: true,
        message: "Successfully fetch favorites",
        data: favorite,
      };
    } else {
      return {
        success: false,
        message: "Failed to fetch favorites",
      };
    }
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
}

// delete from favorite
export async function removeFromFavorite(req) {
  try {
    const user = await User.findById(req.user._id);

    const result = await Favorite.findByIdAndUpdate(user.favorite, {
      $pull: {
        rents: req.query.id,
      },
    });

    if (result) {
      return {
        success: true,
        message: "Successfully deleted from favorite",
      };
    } else {
      return {
        success: false,
        message: "Failed to delete from favorite",
      };
    }
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
}
