/**
 * Title: Write a program using JavaScript on Review Model
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

import { Schema, models, model } from "mongoose";
import connectDB from "@/libs/db";

connectDB();

const reviewSchema = new Schema(
  {
    reviewer: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },

    rent: {
      type: Schema.Types.ObjectId,
      ref: "Rent",
    },

    comment: {
      type: String,
      required: [true, "Please enter your comment"],
      maxLength: [500, "Comment cannot be more than 500 characters"],
    },

    rating: {
      type: Number,
      required: [true, "Please enter your rating"],
    },

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

const Review = models.Review || model("Review", reviewSchema);

export default Review;
