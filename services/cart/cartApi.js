/**
 * Title: Write a program using JavaScript on CartApi
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

const { travelloApi } = require("../travello");

const cartApi = travelloApi.injectEndpoints({
  endpoints: (builder) => ({
    // add to cart
    addToCart: builder.mutation({
      query: (body) => ({
        url: "/cart/",
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body,
      }),

      invalidatesTags: ["Cart", "User", "Rent"],
    }),

    // get cart
    getCart: builder.query({
      query: () => ({
        url: "/cart/",
        method: "GET",
      }),

      providesTags: ["Cart"],
    }),
  }),
});

export const { useAddToCartMutation, useGetCartQuery } = cartApi;
