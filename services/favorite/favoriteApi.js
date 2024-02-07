/**
 * Title: Write a program using JavaScript on FavoriteApi
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
 * Date: 04, February 2024
 */

const { travelloApi } = require("../travello");

const favoriteApi = travelloApi.injectEndpoints({
  endpoints: (builder) => ({
    // add to favorite
    addToFavorite: builder.mutation({
      query: (body) => ({
        url: "/favorite/",
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body,
      }),

      invalidatesTags: ["Favorite", "User"],
    }),

    // get favorites list
    getFavorites: builder.query({
      query: () => ({
        url: "/favorite/",
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),

      providesTags: ["Favorite"],
    }),

    // delete from favorites
    deleteFromFavorite: builder.mutation({
      query: (id) => ({
        url: `/favorite/${id}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),

      invalidatesTags: ["Favorite", "User"],
    }),
  }),
});

export const {
  useAddToFavoriteMutation,
  useGetFavoritesQuery,
  useDeleteFromFavoriteMutation,
} = favoriteApi;
