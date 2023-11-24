/**
 * Title: Write a program using JavaScript on Rent Controller
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

import Rent from "@/models/rent.model";
import User from "@/models/user.model";
import removePhoto from "@/utils/remove.util";

// add new rent
export async function addRent(req) {
  try {
    const { informationArray, timeArray, duration, ...otherInformation } =
      req.body;
    let gallery = [];

    gallery = req.files.map((file) => ({
      url: file.path,
      public_id: file.filename,
    }));

    const rent = await Rent.create({
      duration: JSON.parse(duration),
      informationArray: informationArray.map((info) => JSON.parse(info)),
      timeArray: timeArray.map((time) => JSON.parse(time)),
      ...otherInformation,
      gallery,
    });

    if (rent) {
      await rent.save();
      await User.findByIdAndUpdate(rent.user, {
        $push: {
          rents: rent._id,
        },
      });

      return {
        success: true,
        message: "Rent created successfully",
      };
    } else {
      return {
        success: false,
        message: "Rent not created",
      };
    }
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
}

// get all rents
export async function getRents() {
  try {
    const rents = await Rent.find().populate("user").sort({ updatedAt: -1 });

    if (rents) {
      return {
        success: true,
        message: "Successfully fetch all rents",
        data: rents,
      };
    } else {
      return {
        success: false,
        message: "Failed to fetch all rents",
      };
    }
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
}

// get rent
export async function getRent(req) {
  try {
    const rent = await Rent.findById(req.query.id);

    if (rent) {
      return {
        success: true,
        message: "Successfully fetch rent information",
        data: rent,
      };
    } else {
      return {
        success: false,
        message: "Failed to fetch rent information",
      };
    }
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
}

// update rent
export async function updateRent(req) {
  try {
    let rentInformation = {};

    if (req.body && req.body.status) {
      rentInformation.status = req.body.status;
    } else {
      const {
        body: {
          oldGallery,
          informationArray,
          timeArray,
          duration,
          ...otherInformation
        },
        files,
      } = req;

      if (oldGallery) {
        if (Array.isArray(oldGallery)) {
          oldGallery.forEach(async (file) => {
            await removePhoto(file);
          });
        } else {
          await removePhoto(oldGallery);
        }
        rentInformation.gallery = files.map((file) => ({
          url: file.path,
          public_id: file.filename,
        }));
      }

      rentInformation = {
        ...rentInformation,
        duration: JSON.parse(duration),
        informationArray: informationArray.map((info) => JSON.parse(info)),
        timeArray: timeArray.map((time) => JSON.parse(time)),
        ...otherInformation,
      };
    }

    const rent = await Rent.findByIdAndUpdate(
      req.query.id,
      {
        $set: rentInformation,
      },
      {
        runValidators: false,
        returnOriginal: false,
      }
    );

    if (rent) {
      return {
        success: true,
        message: "Successfully updated rent information",
      };
    } else {
      return {
        success: false,
        message: "Failed to update rent information",
      };
    }
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
}

// get filtered rents
export async function getFilteredRents(req) {
  try {
    let filter = {};
    const parsedBody = JSON.parse(req.body);

    if (parsedBody) {
      if (parsedBody.price) {
        filter.price = { $lte: parsedBody.price };
      }

      if (parsedBody.type) {
        filter.type = { $in: parsedBody.type };
      }

      if (parsedBody.location) {
        filter.location = { $in: parsedBody.location };
      }

      if (parsedBody.startDate && parsedBody.endDate) {
        filter["duration.startDate"] = { $gte: new Date(parsedBody.startDate) };
        filter["duration.endDate"] = { $lte: new Date(parsedBody.endDate) };
      } else if (parsedBody.startDate) {
        filter["duration.startDate"] = { $gte: new Date(parsedBody.startDate) };
      } else if (parsedBody.endDate) {
        filter["duration.endDate"] = { $lte: new Date(parsedBody.endDate) };
      }
    }

    const rents = await Rent.find(filter);

    if (rents) {
      return {
        success: true,
        message: "Successfully fetch filtered rents",
        data: rents,
      };
    } else {
      return {
        success: false,
        message: "Failed to fetch filtered rents",
      };
    }
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
}
