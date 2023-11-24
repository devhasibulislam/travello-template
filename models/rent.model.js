/**
 * Title: Write a program using JavaScript on Rent Model
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
import connectDB from "@/libs/db";

connectDB();

const rentSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Please enter rent title"],
    },
    description: {
      type: String,
      required: [true, "Please enter rent description"],
    },
    gallery: [
      {
        url: {
          type: String,
          default: "https://placehold.co/300x300.png",
        },
        public_id: {
          type: String,
          default: "N/A",
        },
      },
    ],
    price: {
      type: Number,
      required: [true, "Please provide rent price"],
    },
    members: {
      type: Number,
      required: [true, "Please provide how many members"],
    },
    duration: {
      startDate: Date,
      endDate: Date,
    },
    location: {
      type: String,
      required: [true, "Please enter rent location"],
    },
    type: {
      type: String,
      required: [true, "Please enter rent type"],
    },
    informationArray: [
      {
        information: String,
      },
    ],
    timeArray: [
      {
        time: String,
      },
    ],
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
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
  {
    timestamps: true,
  }
);

const Rent = models.Rent || model("Rent", rentSchema);

export default Rent;
