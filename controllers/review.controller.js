/**
 * Title: Write a program using JavaScript on Review Controller
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
 * Date: 05, February 2024
 */

import Rent from "@/models/rent.model";
import Review from "@/models/review.model";
import User from "@/models/user.model";

// add a review
export const addToReview = async (req) => {
  try {
    const review = await Review.create({
      ...req.body,
      reviewer: req.user._id,
    });

    if (review) {
      await User.findByIdAndUpdate(review.reviewer, {
        $push: {
          reviews: review._id,
        },
      });

      await Rent.findByIdAndUpdate(review.rent, {
        $push: {
          reviews: review._id,
        },
      });

      return {
        success: true,
        message: "Successfully added to review",
      };
    } else {
      return {
        success: false,
        message: "Failed to add to review",
      };
    }
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
};

// get reviews
export const getReviews = async () => {
  try {
    const reviews = await Review.find().populate(["reviewer", "rent"]);

    if (reviews) {
      return {
        success: true,
        message: "Successfully fetched reviews",
        data: reviews,
      };
    } else {
      return {
        success: false,
        message: "Failed to fetch reviews",
      };
    }
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
};

// modify review
export const modifyReview = async (req) => {
  try {
    const review = await Review.findByIdAndUpdate(req.query.id, {
      $set: req.body,
    });

    if (review) {
      return {
        success: true,
        message: "Successfully modified review",
      };
    } else {
      return {
        success: false,
        message: "Failed to modify review",
      };
    }
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
};

// remove from review
export const removeFromReview = async (req) => {
  try {
    const review = await Review.findByIdAndDelete(req.query.id);

    if (review) {
      await User.findByIdAndUpdate(review.reviewer, {
        $pull: {
          reviews: review._id,
        },
      });

      await Rent.findByIdAndUpdate(review.rent, {
        $pull: {
          reviews: review._id,
        },
      });

      return {
        success: true,
        message: "Successfully removed from review",
      };
    } else {
      return {
        success: false,
        message: "Failed to remove from review",
      };
    }
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
};
