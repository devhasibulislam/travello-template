/**
 * Title: Write a program using JavaScript on AllReviews
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

import React, { useEffect, useMemo, useState } from "react";
import { AiFillStar } from "react-icons/ai";
import { RiChatQuoteFill } from "react-icons/ri";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import Container from "../shared/container/Container";
import HighlightText from "../shared/highlightText/HighlightText";
import LoadImage from "../shared/image/LoadImage";
import Link from "next/link";
import { LiaPlusSolid } from "react-icons/lia";
import { useSelector } from "react-redux";
import Modal from "../shared/modal/Modal";
import { useForm, Controller } from "react-hook-form";
import { CiStar } from "react-icons/ci";
import { IoStarSharp } from "react-icons/io5";
import { IoIosStar, IoIosStarOutline } from "react-icons/io";
import { useAddReviewMutation } from "@/services/review/reviewApi";
import { toast } from "react-hot-toast";

const animation = { duration: 50000, easing: (t) => t };

const AllReviews = ({ className }) => {
  const { handleSubmit, control, reset } = useForm();
  const [isOpen, setIsOpen] = useState(false);
  const rent = useSelector((state) => state?.rent);
  const reviews = useMemo(() => rent?.reviews || [], [rent?.reviews]);
  const user = useSelector((state) => state?.user);
  const [addReview, { isLoading, data, error }] = useAddReviewMutation();

  useEffect(() => {
    if (isLoading) {
      toast.loading("Adding review...", {
        id: "add-review",
      });
    }

    if (data) {
      toast.success(data?.message, {
        id: "add-review",
      });
      setIsOpen(false);
      reset();
    }

    if (error?.data) {
      toast.error(error?.data?.message, {
        id: "add-review",
      });
    }
  }, [data, error, isLoading, reset]);

  const [sliderRef] = useKeenSlider({
    loop: true,
    initial: 0,
    created(s) {
      s.moveToIdx(5, true, animation);
    },
    updated(s) {
      s.moveToIdx(s.track.details.abs + 5, true, animation);
    },
    animationEnded(s) {
      s.moveToIdx(s.track.details.abs + 5, true, animation);
    },
    breakpoints: {
      "(max-width: 768px)": {
        slides: {
          perView: 1,
          spacing: 15,
        },
      },
      "(min-width: 768px)": {
        slides: {
          perView: 2,
          spacing: 15,
        },
      },
      "(min-width: 1080px)": {
        slides: {
          perView: 3,
          spacing: 15,
        },
      },
    },
  });

  const handleAddReview = (data) => {
    addReview({ ...data, rent: rent?._id });
  };

  return (
    <section className="h-full py-12">
      <Container className={`${className}`}>
        <div className="w-full h-full flex flex-col gap-y-12">
          <div className="flex flex-row justify-between items-center">
            <article className="flex flex-col gap-y-4">
              <h1 className="lg:text-5xl md:text-4xl text-3xl whitespace-normal">
                <HighlightText>Traveler&apos;s</HighlightText> Review
                <LoadImage
                  src="/assets/home-page/destination/underline.svg"
                  alt="arrow"
                  height={7}
                  width={275}
                  className="mt-1.5"
                />
              </h1>
              <p className="text-base">
                Discover the Impact of Our Products and Services Through Their
                Testimonials
              </p>
            </article>
            <div className="text-primary border-b-2 border-b-transparent hover:border-b-primary transition-all">
              <button
                className="flex flex-row gap-x-1 items-center whitespace-nowrap"
                onClick={() => setIsOpen(true)}
              >
                Add Review <LiaPlusSolid />
              </button>
            </div>
          </div>
          {reviews?.length === 0 ? (
            <p className="text-sm text-red-500">No reviews found!</p>
          ) : (
            <div ref={sliderRef} className="keen-slider">
              {reviews?.map((review, index) => (
                <article
                  key={index}
                  className="group relative flex flex-col gap-y-4 border hover:border-primary transition-colors ease-linear p-4 rounded keen-slider__slide"
                >
                  <div className="flex flex-row gap-x-2.5 items-end">
                    <LoadImage
                      src={review?.reviewer?.avatar?.url}
                      alt={review?.reviewer?.avatar?.public_id}
                      width={50}
                      height={50}
                      className="rounded h-[50px] w-[50px] object-cover"
                    />
                    <div className="flex flex-row justify-between w-full">
                      <div className="">
                        <h2 className="">{review?.reviewer?.name}</h2>
                        <p className="text-xs whitespace-normal">
                          Traveler, {review?.reviewer?.address || "N/A"}
                        </p>
                      </div>
                      <div className="flex flex-col items-end">
                        <p className="text-sm flex flex-row items-center">
                          <AiFillStar className="text-[#F9BC1D]" /> •{" "}
                          {review.rating}
                        </p>
                        <p className="text-xs">
                          {(() => {
                            const date = new Date(review?.createdAt);
                            const day = date.getDate();
                            const suffix = (day) => {
                              if (day >= 11 && day <= 13) return "th";
                              switch (day % 10) {
                                case 1:
                                  return "st";
                                case 2:
                                  return "nd";
                                case 3:
                                  return "rd";
                                default:
                                  return "th";
                              }
                            };
                            const formattedDate =
                              day +
                              suffix(day) +
                              " " +
                              date.toLocaleDateString("en-GB", {
                                month: "long",
                                year: "numeric",
                              });
                            return formattedDate;
                          })()}
                        </p>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm line-clamp-4">
                    <RiChatQuoteFill className="absolute top-2 left-2 w-6 h-6 text-primary z-10 opacity-0 group-hover:opacity-100 transition-opacity ease-linear delay-100" />
                    {review.comment}
                  </p>
                </article>
              ))}
            </div>
          )}
        </div>
      </Container>

      {isOpen && (
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          className="lg:w-1/4 md:w-1/2 w-full z-50"
        >
          <section className="h-full w-full flex flex-col gap-y-8">
            <article className="flex flex-col gap-y-2">
              <h1 className="text-2xl drop-shadow">
                Write Your <HighlightText>Review</HighlightText>
              </h1>
              <ul className="text-sm list-disc list-inside">
                <li className="truncate">Comment limited to 500 characters</li>
                <li className="truncate">Choose stars between 1 to 5</li>
              </ul>
            </article>
            <form
              className="w-full flex flex-col gap-y-4"
              onSubmit={handleSubmit(handleAddReview)}
            >
              {/* comment */}
              <Controller
                control={control}
                name="comment"
                rules={{ required: true }}
                render={({ field }) => (
                  <textarea
                    {...field}
                    name="comment"
                    id="comment"
                    rows="5"
                    maxlength="500"
                    placeholder="Write your thoughts..."
                    className="w-full"
                  ></textarea>
                )}
              />

              {/* rating */}
              <Controller
                name="rating"
                control={control}
                defaultValue={1}
                rules={{ required: true }}
                render={({ field }) => (
                  <p className="flex flex-row justify-center items-center gap-x-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        className={`cursor-pointer ${
                          star <= field.value ? "text-primary" : ""
                        }`}
                        onClick={() => field.onChange(star)}
                      >
                        {star <= field.value ? (
                          <IoIosStar className="h-6 w-6" />
                        ) : (
                          <IoIosStarOutline className="h-6 w-6" />
                        )}
                      </button>
                    ))}
                  </p>
                )}
              />

              {/* submit */}
              <button
                type="submit"
                className="border px-4 py-2 mx-auto rounded text-sm hover:border-primary"
              >
                Add Review
              </button>
            </form>
          </section>
        </Modal>
      )}
    </section>
  );
};

export default AllReviews;
