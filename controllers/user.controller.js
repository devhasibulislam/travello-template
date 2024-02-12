/**
 * Title: Write a program using JavaScript on User Controller
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
 * Date: 17, November 2023
 */

import Cart from "@/models/cart.model";
import Favorite from "@/models/favorite.model";
import Purchase from "@/models/purchase.model";
import Rent from "@/models/rent.model";
import Review from "@/models/review.model";
import User from "@/models/user.model";
import removePhoto from "@/utils/remove.util";

// get all users
export async function getUsers() {
  try {
    const users = await User.find().populate([
      "rents",
      {
        path: "purchases",
        populate: [
          "user",
          {
            path: "rent",
            populate: ["users", "owner", "reviews"],
          },
        ],
      },
    ]);

    if (users) {
      return {
        success: true,
        message: "Successfully fetch all users",
        data: users,
      };
    } else {
      return {
        success: false,
        message: "Failed to fetch all users",
      };
    }
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
}

// get an user
export async function getUser(req) {
  try {
    const user = await User.findById(req.query.id);

    if (user) {
      return {
        success: true,
        message: "Successfully fetch user information",
        data: user,
      };
    } else {
      return {
        success: false,
        message: "Failed to fetch user information",
      };
    }
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
}

// update a user
export async function updateUser(req) {
  try {
    const user = await User.findById(req.query.id);

    if (!user) {
      return {
        success: false,
        message: "User not found",
      };
    } else {
      const updatedUser = req.body;

      if (req.file && req.file.path && req.file.filename) {
        await removePhoto(user.avatar.public_id);

        updatedUser.avatar = {
          url: req.file.path,
          public_id: req.file.filename,
        };
      }

      const result = await User.findByIdAndUpdate(user._id, {
        $set: updatedUser,
      });

      if (result) {
        return {
          success: true,
          message: "Successfully updated user information",
        };
      } else {
        return {
          success: false,
          message: "Failed to update user information",
        };
      }
    }
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
}

// delete a user
export async function deleteUser(req) {
  try {
    const user = await User.findByIdAndDelete(req.query.id);

    if (!user) {
      return {
        success: false,
        message: "User not found",
      };
    } else {
      await removePhoto(user.avatar.public_id);

      // remove user favorites
      if (user.favorite) {
        Favorite.findByIdAndDelete(user.favorite);
      }

      // remove user cart
      if (user.cart) {
        Cart.findByIdAndDelete(user.cart);
      }

      // remove user from all rents
      if (user.rents.length > 0) {
        for (let i = 0; i < user.rents.length; i++) {
          const rent = await Rent.findByIdAndDelete(user.rents[i]);

          rent.gallery.forEach(
            async (image) => await removePhoto(image.public_id)
          );

          // remove from all users cart
          await Cart.updateMany(
            {},
            {
              $pull: {
                rents: rent._id,
              },
            }
          );

          // remove from all users favorite list
          await Favorite.updateMany(
            {},
            {
              $pull: {
                rents: rent._id,
              },
            }
          );

          //
          rent.users.forEach(async (user) => {
            const review = await Review.findOne({ reviewer: user });
            const purchase = await Purchase.findOne({ user: user });

            if (review) {
              await User.findByIdAndUpdate(review.reviewer, {
                $pull: {
                  reviews: review?._id,
                },
              });
            }

            if (purchase) {
              await User.findByIdAndUpdate(purchase.user, {
                $pull: {
                  purchases: purchase?._id,
                },
              });
            }

            // remove from purchase list
            await Purchase.deleteMany({ rent: rent._id });

            // remove from reviews list
            await Review.deleteMany({ rent: rent._id });
          });
        }
      }

      // remove user purchases
      if (user.purchases.length > 0) {
        for (let i = 0; i < user.purchases.length; i++) {
          await Purchase.findByIdAndDelete(user.purchases[i]);
        }
      }

      // remove user reviews
      if (user.reviews.length > 0) {
        for (let i = 0; i < user.reviews.length; i++) {
          await Review.findByIdAndDelete(user.reviews[i]);
        }
      }

      return {
        success: true,
        message: "Successfully deleted user",
      };
    }
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
}
