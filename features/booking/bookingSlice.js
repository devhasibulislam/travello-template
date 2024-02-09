/**
 * Title: Write a program using JavaScript on BookingInfoSlice
 * Author: Hasibul Islam
 * Portfolio: https://devhasibulislam.vercel.app
 * Linkedin: https://linkedin.com/in/devhasibulislam
 * GitHub: https://github.com/devhasibulislam
 * Facebook: https://facebook.com/devhasibulislam
 * Instagram: https://instagram.com/devhasibulislam
 * Twitter: https://twitter.com/devhasibulislam
 * Pinterest: https://pinterest.com/devhasibulislam
 * WhatsApp: https://wa.me/8801906315901
 * Telegram: devhasibulislam
 * Date: 07, February 2024
 */

import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const bookingSlice = createSlice({
  name: "bookingInfo",
  initialState,
  reducers: {
    setBooking: (state, action) => {
      state = action.payload;
      return state;
    },
  },
});

export const { setBooking } = bookingSlice.actions;
export default bookingSlice.reducer;
