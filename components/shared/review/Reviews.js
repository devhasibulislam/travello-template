/**
 * Title: Write a program using JavaScript on Reviews
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
 * Date: 05, October 2023
 */

import Container from "@/components/shared/container/Container";
import HighlightText from "@/components/shared/highlightText/HighlightText";
import LoadImage from "@/components/shared/image/LoadImage";
import Image from "next/image";
import React, { useEffect, useMemo } from "react";
import { AiFillStar } from "react-icons/ai";
import { RiChatQuoteFill } from "react-icons/ri";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { useGetAllReviewsQuery } from "@/services/review/reviewApi";
import { toast } from "react-hot-toast";

const animation = { duration: 50000, easing: (t) => t };

const Reviews = ({ className }) => {
  const { isLoading, data, error } = useGetAllReviewsQuery();
  const reviews = useMemo(() => data?.data || [], [data]);

  console.log(reviews);

  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message, {
        id: "reviews",
      });
    }

    if (isLoading) {
      toast.loading("Fetching reviews...", {
        id: "reviews",
      });
    }

    if (data) {
      toast.success(data?.message, {
        id: "reviews",
      });
    }
  }, [isLoading, data, error]);

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

  return (
    <section className="h-full py-12">
      <Container className={`${className}`}>
        <div className="w-full h-full flex flex-col gap-y-12">
          <article className="flex flex-col gap-y-4">
            <h1 className="lg:text-5xl md:text-4xl text-3xl whitespace-normal">
              <HighlightText>Traveller&apos;s</HighlightText> Review
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

          {!isLoading && reviews?.length === 0 && (
            <p className="text-sm text-red-500">No reviews found!</p>
          )}

          {isLoading && reviews?.length === 0 ? (
            <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="flex flex-col gap-y-4 border rounded p-3"
                >
                  <div className="flex flex-row gap-x-2.5 items-end">
                    <div className="!h-[50px] !w-[50px] rounded animate-pulse bg-gray-200"></div>
                    <div className="flex flex-row justify-between w-full">
                      <div className="flex flex-col gap-y-1 w-full">
                        <div className="w-2/3 h-4 animate-pulse rounded bg-gray-200"></div>
                        <div className="w-3/4 h-4 animate-pulse rounded bg-gray-200"></div>
                      </div>
                      <div className="flex flex-col items-end gap-y-1 w-full">
                        <div className="w-2/3 h-4 animate-pulse rounded bg-gray-200"></div>
                        <div className="w-3/4 h-4 animate-pulse rounded bg-gray-200"></div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-y-1.5">
                    <div className="w-full h-4 animate-pulse rounded bg-gray-200"></div>
                    <div className="w-full h-4 animate-pulse rounded bg-gray-200"></div>
                    <div className="w-3/4 h-4 animate-pulse rounded bg-gray-200"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div ref={sliderRef} className="keen-slider">
              {reviews?.map((review) => (
                <article
                  key={review?._id}
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
                        <p className="text-xs">{review.rent.location}</p>
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
    </section>
  );
};

export default Reviews;
