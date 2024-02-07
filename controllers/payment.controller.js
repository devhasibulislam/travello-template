/**
 * Title: Write a program using JavaScript on Payment Controller
 * Author: Hasibul Islam
 * Portfolio: https://devhasibulislam.vercel.app
 * Linkedin: https://linkedin.com/in/devhasibulislam
 * GitHub: https://github.com/devhasibulislam
 * Facebook: https://facebook.com/devhasibulislam
 * Instagram: https:/instagram.com/devhasibulislam
 * Twitter: https://twitter.com/devhasibulislam
 * Pinterest: https://pinterest.com/devhasibulislam
 * WhatsApp: https://wa.me/8801906315901
 * Telegram: devhasibulislam
 * Date: 06, February 2024
 */

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export async function createPaymentIntent(req) {
  try {
    const { price } = req.body;

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(Number(price) * 100),
      currency: "usd",
      automatic_payment_methods: {
        enabled: true,
      },
    });

    return {
      success: true,
      message: "Payment intent created successfully",
      clientSecret: paymentIntent.client_secret,
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
}
