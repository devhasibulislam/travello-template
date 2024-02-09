/**
 * Title: Write a program using JavaScript on ReviewApi
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
 * Date: 05, February 2024
 */

const { travelloApi } = require("../travello");

const reviewApi = travelloApi.injectEndpoints({
  endpoints: (build) => ({
    // post a review
    addReview: build.mutation({
      query: (body) => ({
        url: "/review/",
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body,
      }),

      invalidatesTags: ["Review", "User", "Rent"],
    }),

    // get all reviews
    getAllReviews: build.query({
      query: () => ({
        url: "/review/",
        method: "GET",
      }),

      providesTags: ["Review", "User", "Rent"],
    }),

    // modify review
    modifyReview: build.mutation({
      query: ({ id, body }) => ({
        url: `/review/${id}`,
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body,
      }),

      invalidatesTags: ["Review", "User", "Rent"],
    }),

    // delete review
    deleteReview: build.mutation({
      query: (id) => ({
        url: `/review/${id}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),

      invalidatesTags: ["Review", "User", "Rent"],
    }),
  }),
});

export const {
  useAddReviewMutation,
  useGetAllReviewsQuery,
  useModifyReviewMutation,
  useDeleteReviewMutation,
} = reviewApi;
