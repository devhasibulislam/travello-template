/**
 * Title: Write a program using JavaScript on TravelAvailabilitySlice
 * Author: Hasibul Islam
 * Portfolio: https://devhasibulislam.vercel.app
 * Linkedin: https://linkedin.com/in/devhasibulislam
 * GitHub: https://github.com/in/devhasibulislam
 * Facebook: https://facebook.com/in/devhasibulislam
 * Instagram: https://instagram.com/in/devhasibulislam
 * Twitter: https://twitter.com/in/devhasibulislam
 * Pinterest: https://pinterest.com/in/devhasibulislam
 * WhatsApp: https://wa.me/8801906315901
 * Telegram: devhasibulislam
 * Date: 18, August 2023
 */

import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const travelAvailabilitySlice = createSlice({
  name: "travelAvailabilitySlice",
  initialState,
  reducers: {
    addTravelAvailability: (state, { payload }) => {
      Object.assign(state, payload);
    },
  },
});

export const { addTravelAvailability } = travelAvailabilitySlice.actions;
export default travelAvailabilitySlice.reducer;
