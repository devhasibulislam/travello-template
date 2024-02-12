/**
 * Title: Write a program using JavaScript on Auth Controller
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

import User from "@/models/user.model";
import generateAccessToken from "@/utils/jwt.util";

// signup
export async function signUpUser(req) {
  try {
    const user = await User.create({
      ...req.body,
      avatar: {
        url: req.file.path,
        public_id: req.file.filename,
      },
    });

    const result = await user.save({ validateBeforeSave: true });

    if (result) {
      return {
        success: true,
        message: "User created successfully",
      };
    } else {
      return {
        success: false,
        message: "User not created",
      };
    }
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
}

// signin
export async function signInUser(req) {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (user) {
      if (await user.comparePassword(req.body.password, user.password)) {
        if (user.status === "active") {
          const accessToken = generateAccessToken(user);

          return {
            success: true,
            message: "User logged in successfully",
            accessToken,
          };
        } else {
          return {
            success: false,
            message: "Your account is deactivated",
          };
        }
      } else {
        return {
          success: false,
          message: "Incorrect password",
        };
      }
    } else {
      return {
        success: false,
        message: "User not found",
      };
    }
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
}

// forgot password
export async function forgotPassword(req) {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (user) {
      const hashedPassword = user.encryptPassword(req.body.password);

      const result = await User.findByIdAndUpdate(user._id, {
        $set: { password: hashedPassword },
      });

      if (result) {
        return {
          success: true,
          message: "Password reset successfully",
        };
      } else {
        return {
          success: false,
          message: "Password reset failed",
        };
      }
    } else {
      return {
        success: false,
        message: "User not found",
      };
    }
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
}

// get persist user
export async function persistUser(req) {
  try {
    const user = await User.findById(req.user._id).populate([
      {
        path: "favorite",
        populate: [
          "user",
          {
            path: "rents",
            populate: ["owner"],
          },
        ],
      },
      {
        path: "cart",
        populate: [
          "user",
          {
            path: "rents",
            populate: ["owner"],
          },
        ],
      },
      {
        path: "reviews",
        populate: ["reviewer", "rent"],
      },
      {
        path: "purchases",
        populate: [
          "user",
          {
            path: "rent",
            populate: [
              {
                path: "users",
                populate: [
                  {
                    path: "purchases",
                    populate: ["user", "rent"],
                  },
                ],
              },
              "owner",
              "reviews",
            ],
          },
        ],
      },
      {
        path: "rents",
        populate: [
          {
            path: "users",
            populate: [
              {
                path: "purchases",
                populate: ["user", "rent"],
              },
            ],
          },
          ,
          "owner",
          "reviews",
        ],
      },
    ]);

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
