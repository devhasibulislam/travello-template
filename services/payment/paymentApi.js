/**
 * Title: Write a program using JavaScript on PaymentApi
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
 * Date: 06, February 2024
 */

const { travelloApi } = require("../travello");

const paymentApi = travelloApi.injectEndpoints({
  endpoints: (build) => ({
    // create payment intent
    createPaymentIntent: build.mutation({
      query: (body) => ({
        url: "/payment/create-intent",
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body,
      }),
    }),

    // integrate payment to purchase
    integratePurchase: build.mutation({
      query: (body) => ({
        url: "/purchase/",
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body,
      }),
    }),
  }),
});

export const { useCreatePaymentIntentMutation, useIntegratePurchaseMutation } =
  paymentApi;
