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

import cron from "node-cron";
import { Schema, models, model } from "mongoose";
import connectDB from "@/libs/db";

connectDB();

const rentSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Please enter rent title"],
      unique: true,
      trim: true,
      maxLength: [100, "Title cannot be more than 100 characters"],
    },

    summary: {
      type: String,
      required: [true, "Please enter rent summary"],
      trim: true,
      maxLength: [500, "summary cannot be more than 500 characters"],
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
      default: 0,
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

    information: [
      {
        type: String,
        trim: true,
        maxLength: [100, "information cannot be more than 100 characters"],
      },
    ],

    times: [
      {
        type: String,
        trim: true,
        maxLength: [100, "times cannot be more than 100 characters"],
      },
    ],

    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },

    users: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    reviews: [
      {
        type: Schema.Types.ObjectId,
        ref: "Review",
      },
    ],

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

// Pre-save middleware to update the status based on endDate
rentSchema.pre("save", function (next) {
  const currentDate = new Date();
  if (
    this.duration &&
    this.duration.endDate &&
    currentDate > this.duration.endDate
  ) {
    this.status = "inactive";
  }
  next();
});

const Rent = models.Rent || model("Rent", rentSchema);

// Schedule a job to run every day to check and update the status
cron.schedule("0 0 * * *", async () => {
  const currentDate = new Date();
  const rentsToUpdate = await Rent.find({
    "duration.endDate": { $lt: currentDate },
    status: "active",
  });

  for (const rent of rentsToUpdate) {
    rent.status = "inactive";
    await rent.save();
  }
});

export default Rent;
