/**
 * Title: Write a program using JavaScript on RentApi
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
 * Date: 17, November 2023
 */

const { travelloApi } = require("../travello");

const rentApi = travelloApi.injectEndpoints({
  endpoints: (builder) => ({
    // add new rent
    addRent: builder.mutation({
      query: (body) => ({
        url: "/rent/",
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body,
      }),

      invalidatesTags: [
        "Rent",
        "User",
        "Cart",
        "Favorite",
        "Purchase",
        "Review",
      ],
    }),

    // get all rents
    getRents: builder.query({
      query: () => ({
        url: "/rent/",
        method: "GET",
      }),

      providesTags: ["Rent"],
    }),

    // get rent
    getRent: builder.query({
      query: (id) => ({
        url: `/rent/${id}`,
        method: "GET",
      }),

      providesTags: ["Rent"],
    }),

    // update rent
    updateRent: builder.mutation({
      query: ({ id, body }) => ({
        url: `/rent/${id}`,
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body,
      }),

      invalidatesTags: [
        "Rent",
        "User",
        "Cart",
        "Favorite",
        "Purchase",
        "Review",
      ],
    }),

    // delete rent
    deleteRent: builder.mutation({
      query: (id) => ({
        url: `/rent/${id}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),

      invalidatesTags: [
        "Rent",
        "User",
        "Cart",
        "Favorite",
        "Purchase",
        "Review",
      ],
    }),

    // get filtered rents
    getFilteredRents: builder.mutation({
      query: (body) => ({
        url: "/rent/filter",
        method: "PATCH",
        body,
      }),

      invalidatesTags: ["Rent"],
    }),
  }),
});

export const {
  useAddRentMutation,
  useGetRentsQuery,
  useGetRentQuery,
  useUpdateRentMutation,
  useDeleteRentMutation,
  useGetFilteredRentsMutation,
} = rentApi;
