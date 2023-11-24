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

import User from "@/models/user.model";
import removePhoto from "@/utils/remove.util";

// get all users
export async function getUsers() {
  try {
    const users = await User.find();

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
    console.log(req.body);
    let updateFields = {};

    if (req.body && req.body.status !== undefined) {
      updateFields.status = req?.body?.status;
    } else {
      updateFields = {
        ...req?.body,
      };
    }

    if (req.file && req.file.path && req.file.filename && req.body.oldAvatar) {
      await removePhoto(req.body.oldAvatar);

      updateFields.avatar = {
        url: req.file.path,
        public_id: req.file.filename,
      };

      delete updateFields.oldAvatar;
    }

    const user = await User.findByIdAndUpdate(
      req.query.id,
      { $set: updateFields },
      { runValidators: false, returnOriginal: false }
    );

    if (user) {
      return {
        success: true,
        message: req.body.status
          ? "Successfully updated user status"
          : "Successfully updated user information",
      };
    } else {
      return {
        success: false,
        message: req.body.status
          ? "Failed to update user status"
          : "Failed to update user information",
      };
    }
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
}
