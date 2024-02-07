/**
 * Title: Write a program using JavaScript on AuthApi
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
 * Date: 16, November 2023
 */

const { travelloApi } = require("../travello");

const authApi = travelloApi.injectEndpoints({
  endpoints: (builder) => ({
    // signup
    signup: builder.mutation({
      query: (body) => ({
        url: "/auth/signup",
        method: "POST",
        body,
      }),

      invalidatesTags: ["User"],
    }),

    // signin
    signin: builder.mutation({
      query: (body) => ({
        url: "/auth/signin",
        method: "POST",
        body,
      }),
    }),

    // forgot password
    forgotPassword: builder.mutation({
      query: (body) => ({
        url: "/auth/forgot-password",
        method: "PATCH",
        body,
      }),
    }),

    // persist user
    persistUser: builder.query({
      query: () => ({
        url: "/auth/me",
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),

      providesTags: ["User", "Cart", "Rent", "Favorite", "Purchase", "Review"],
    }),
  }),
});

export const {
  useSignupMutation,
  useSigninMutation,
  useForgotPasswordMutation,
  usePersistUserQuery,
} = authApi;
