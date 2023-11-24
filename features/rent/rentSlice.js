/**
 * Title: Write a program using JavaScript on RentSlice
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
 * Date: 18, November 2023
 */

import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const rentSlice = createSlice({
  name: "rent",
  initialState,
  reducers: {
    setRent: (state, action) => {
      state = action.payload;
      return state;
    },
  },
});

export const { setRent } = rentSlice.actions;
export default rentSlice.reducer;
