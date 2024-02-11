/**
 * Title: Write a program using JavaScript on RentFilterSlice
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
 * Date: 19, November 2023
 */

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  category: [],
  countries: [],
  priceRange: { min: 5, max: 500 },
  dateRange: { startDate: null, endDate: null },
  // ratings: [],
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setCategory: (state, action) => {
      state.category = action.payload;
    },
    
    setCountries: (state, action) => {
      state.countries = action.payload;
    },

    setPriceRange: (state, action) => {
      state.priceRange = action.payload;
    },

    setDateRange: (state, action) => {
      state.dateRange = action.payload;
    },

    // setRatings: (state, action) => {
    //   state.ratings = action.payload;
    // },

    // resetFilter: (state) => {
    //   state.category = [];
    //   state.countries = [];
    //   state.priceRange = { min: 5, max: 500 };
    //   state.dateRange = { startDate: null, endDate: null };
    //   // state.ratings = [];
    // },
  },
});

export const {
  setCategory,
  setCountries,
  setPriceRange,
  setDateRange,
  // setRatings,
  // resetFilter,
} = filterSlice.actions;
export default filterSlice.reducer;
