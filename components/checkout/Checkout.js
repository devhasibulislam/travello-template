import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Modal from "../shared/modal/Modal";
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import {
  useCreatePaymentIntentMutation,
  useIntegratePurchaseMutation,
} from "@/services/payment/paymentApi";
import { toast } from "react-hot-toast";
import LoadImage from "../shared/image/LoadImage";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

const Checkout = ({ members, duration }) => {
  const rent = useSelector((state) => state?.rent);
  const [isOpen, setIsOpen] = useState(false);
  const [clientSecret, setClientSecret] = useState("");
  const [createPaymentIntent, { isLoading, data, error }] =
    useCreatePaymentIntentMutation();

  useEffect(() => {
    if (isLoading) {
      toast.loading("Creating Payment Intent...", {
        id: "paymentIntent",
      });
    }

    if (data) {
      toast.success(data?.message, {
        id: "paymentIntent",
      });
      setClientSecret(data?.clientSecret);
    }

    if (error?.data) {
      toast.error(error?.data?.message, {
        id: "paymentIntent",
      });
    }
  }, [data, error, isLoading]);

  const options = {
    clientSecret,
  };

  return (
    <>
      <button
        type="submit"
        className="bg-primary hover:bg-secondary hover:text-primary hover:border-primary border border-transparent text-white p-1.5 rounded-primary flex justify-center items-center transition-all delay-100 text-sm w-full"
        onClick={() => {
          createPaymentIntent({
            price: rent?.price * members,
          });
          setIsOpen(true);
        }}
      >
        Book Now
      </button>

      {isOpen && clientSecret && (
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          className="lg:w-1/2 md:w-3/4 w-full z-50 !h-3/4"
        >
          {isLoading ? (
            <div className="h-full w-full flex justify-center items-center">
              Loading...
            </div>
          ) : (
            <section className="w-full h-full grid grid-cols-12 gap-8">
              <article className="h-full w-full lg:col-span-7 md:col-span-8 col-span-12 flex flex-col gap-y-8">
                <h1 className="text-xl">Pay Travello Booking</h1>
                <div className="flex flex-col gap-y-2">
                  <div className="flex flex-col gap-y-1">
                    <span className="flex -space-x-4">
                      {rent?.gallery?.map((gallery) => (
                        <LoadImage
                          key={gallery?._id}
                          src={gallery?.url}
                          alt={gallery?.public_id}
                          height={30}
                          width={30}
                          className="h-[30px] w-[30px] rounded-secondary border border-primary object-cover"
                        />
                      ))}
                    </span>
                    <h2 className="text-lg">{rent?.title}</h2>
                  </div>
                  <p className="text-sm">{rent?.summary}</p>
                  <span className="text-xs py-0.5 px-2 bg-indigo-50 text-indigo-800 border border-indigo-500 rounded-secondary capitalize w-fit">
                    {rent?.location}
                  </span>
                </div>

                <div className="mt-auto text-sm flex flex-col gap-y-1">
                  <p className="flex flex-row justify-between items-center">
                    <span className="">Cost Per Night ($)</span>
                    <span className="">{rent?.price}</span>
                  </p>
                  <p className="flex flex-row justify-between items-center">
                    <span className="">Overall Members</span>
                    <span className="">{members}</span>
                  </p>
                  <hr />
                  <p className="flex flex-row justify-between items-center">
                    <span className="">Total Cost ($)</span>
                    <span className="">{members * rent?.price}</span>
                  </p>
                </div>
              </article>

              <div className="h-full w-full lg:col-span-5 md:col-span-4 col-span-12 mt-auto">
                <Elements stripe={stripePromise} options={options}>
                  <CheckoutForm />
                </Elements>
              </div>
            </section>
          )}
        </Modal>
      )}
    </>
  );
};

function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const rent = useSelector((state) => state?.rent);
  const [integratePurchase, { isLoading: purchasing, data, error }] =
    useIntegratePurchaseMutation();

  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const options = {
    layout: "accordion",
  };

  useEffect(() => {
    if (purchasing) {
      toast.loading("Purchasing...", {
        id: "integrate-purchase",
      });
    }

    if (data) {
      toast.success(
        "Click Pay Now button to complete payment!" || data?.message,
        {
          id: "integrate-purchase",
        }
      );
    }

    if (error?.data) {
      toast.error(error?.data?.message, {
        id: "integrate-purchase",
      });
    }
  }, [data, error, purchasing]);

  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent.status) {
        case "succeeded":
          integratePurchase({
            rent: rent?._id,
            price: rent?.price * rent?.members,
            duration,
          });
          setMessage("Just one more step. Your payment was successful!");
          break;
        case "processing":
          setMessage("Your payment is processing.");
          break;
        case "requires_payment_method":
          setMessage("Your payment was not successful, please try again.");
          break;
        default:
          setMessage("Something went wrong.");
          break;
      }
    });
  }, [stripe, rent?.price, rent?.members, rent?._id, integratePurchase]);

  const handleAddPayment = async (event) => {
    event.preventDefault();

    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    await stripe
      .confirmPayment({
        elements,
        confirmParams: {
          return_url: `${process.env.NEXT_PUBLIC_BASE_URL}/tours/${
            rent._id
          }?tour_title=${rent.title
            .replace(/[^\w\s]|[\s]+/g, "-")
            .replace(/-+/g, "-")
            .toLowerCase()}`,
        },
      })
      .then(({ error }) => {
        if (error.type === "card_error" || error.type === "validation_error") {
          setMessage(error.message);
        } else {
          setMessage("An unexpected error occurred.");
        }
      });

    setIsLoading(false);
  };

  return (
    <>
      <form
        id="payment-element"
        onSubmit={handleAddPayment}
        className="flex flex-col gap-y-4"
      >
        <PaymentElement options={options} />
        <button
          id="submit"
          type="submit"
          disabled={isLoading || !stripe || !elements}
          className="custom-bg-color p-2 text-primary bg-primary/10 border border-primary hover:bg-secondary rounded w-full"
        >
          {isLoading ? "Loading..." : "Pay Now"}
        </button>
        {message && (
          <p id="payment-message" className="text-xs">
            {message}
          </p>
        )}
      </form>
    </>
  );
}

export default Checkout;
