/**
 * Title: Write a program using JavaScript on User Model
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

import { Schema, models, model } from "mongoose";
import { genSaltSync, hashSync, compare } from "bcryptjs";
import connectDB from "@/libs/db";

connectDB();

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter your name"],
      maxLength: [100, "Name cannot be more than 100 characters"],
    },

    email: {
      type: String,
      required: [true, "Please enter your email"],
      unique: true,
    },

    avatar: {
      url: {
        type: String,
        default: "https://placehold.co/300x300.png",
      },
      public_id: {
        type: String,
        default: "N/A",
      },
    },

    password: {
      type: String,
      required: [true, "Please enter your password"],
    },

    phone: {
      type: String,
      required: [true, "Please enter your phone number"],
      unique: true,
    },

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },

    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },

    address: {
      type: String,
      trim: true,
      maxLength: [200, "Address cannot be more than 200 characters"],
    },

    rents: [
      {
        type: Schema.Types.ObjectId,
        ref: "Rent",
      },
    ],

    cart: {
      type: Schema.Types.ObjectId,
      ref: "Cart",
    },

    favorite: {
      type: Schema.Types.ObjectId,
      ref: "Favorite",
    },

    reviews: [
      {
        type: Schema.Types.ObjectId,
        ref: "Review",
      },
    ],

    purchases: [
      {
        type: Schema.Types.ObjectId,
        ref: "Purchase",
      },
    ],

    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

// encrypt the password before saving
userSchema.pre("save", async function (next) {
  try {
    if (!this.isModified("password")) {
      return next();
    }

    const salt = genSaltSync(10);
    const hash = hashSync(this.password, salt);
    this.password = hash;
  } catch (error) {
    next(error);
  }
});

/* encrypted user account password */
userSchema.methods.encryptPassword = function (password) {
  const salt = genSaltSync(10);
  const hashedPassword = hashSync(password, salt);

  return hashedPassword;
};

// compare user given password with db stored password
userSchema.methods.comparePassword = async function (
  currentPassword,
  storedPassword
) {
  const isMatch = await compare(currentPassword, storedPassword);
  return isMatch;
};

const User = models.User || model("User", userSchema);

export default User;
