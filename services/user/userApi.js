/**
 * Title: Write a program using JavaScript on UserApi
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

const userApi = travelloApi.injectEndpoints({
  endpoints: (builder) => ({
    // get all users
    getUsers: builder.query({
      query: () => ({
        url: "/users",
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),

      providesTags: ["User"],
    }),

    // get an user
    getUser: builder.query({
      query: (id) => ({
        url: `/users/${id}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),

      providesTags: ["User"],
    }),

    // update an user
    updateUser: builder.mutation({
      query: ({ id, body }) => ({
        url: `/users/${id}`,
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body,
      }),

      invalidatesTags: ["User"],
    }),

    // delete an user
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/users/${id}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),

      invalidatesTags: [
        "User",
        "Cart",
        "Rent",
        "Favorite",
        "Purchase",
        "Review",
      ],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useUpdateUserMutation,
  useGetUserQuery,
  useDeleteUserMutation,
} = userApi;
