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
import React from "react";
import { AiFillStar } from "react-icons/ai";
import { RiChatQuoteFill } from "react-icons/ri";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

const animation = { duration: 50000, easing: (t) => t };

const Reviews = () => {
  const reviews = [
    {
      name: "Eli Jang",
      avatar: "/assets/static/Travellers Review/1.png",
      location: "China",
      rating: 5,
      createdAt: "20 July 2023",
      summary:
        "As I already said we really enjoyed the trip what so ever and I reckon that the best moments were when we visited. Exceeded all expectations! Flawless arrangements, knowledgeable guides, and unforgettable experiences. Highly recommend!",
    },
    {
      name: "Warren Chae",
      avatar: "/assets/static/Travellers Review/2.png",
      location: "New York",
      rating: 3,
      createdAt: "22 July 2023",
      summary:
        "As I already said we really enjoyed the trip what so ever and I reckon that the best moments were when we visited. Exceeded all expectations! Flawless arrangements, knowledgeable guides, and unforgettable experiences. Highly recommend!",
    },
    {
      name: "Euantae Lee",
      avatar: "/assets/static/Travellers Review/3.png",
      location: "New York",
      rating: 3,
      createdAt: "22 July 2023",
      summary:
        "As I already said we really enjoyed the trip what so ever and I reckon that the best moments were when we visited. Exceeded all expectations! Flawless arrangements, knowledgeable guides, and unforgettable experiences. Highly recommend!",
    },
    {
      name: "Jack Lee",
      avatar: "/assets/static/Travellers Review/4.png",
      location: "New York",
      rating: 3,
      createdAt: "22 July 2023",
      summary:
        "As I already said we really enjoyed the trip what so ever and I reckon that the best moments were when we visited. Exceeded all expectations! Flawless arrangements, knowledgeable guides, and unforgettable experiences. Highly recommend!",
    },
    {
      name: "Sinu Han",
      avatar: "/assets/static/Travellers Review/5.png",
      location: "China",
      rating: 5,
      createdAt: "20 July 2023",
      summary:
        "As I already said we really enjoyed the trip what so ever and I reckon that the best moments were when we visited. Exceeded all expectations! Flawless arrangements, knowledgeable guides, and unforgettable experiences. Highly recommend!",
    },
    {
      name: "Jack Kim",
      avatar: "/assets/static/Travellers Review/6.png",
      location: "New York",
      rating: 3,
      createdAt: "22 July 2023",
      summary:
        "As I already said we really enjoyed the trip what so ever and I reckon that the best moments were when we visited. Exceeded all expectations! Flawless arrangements, knowledgeable guides, and unforgettable experiences. Highly recommend!",
    },
    {
      name: "Hudson Ahn",
      avatar: "/assets/static/Travellers Review/7.png",
      location: "New York",
      rating: 3,
      createdAt: "22 July 2023",
      summary:
        "As I already said we really enjoyed the trip what so ever and I reckon that the best moments were when we visited. Exceeded all expectations! Flawless arrangements, knowledgeable guides, and unforgettable experiences. Highly recommend!",
    },
    {
      name: "Daniel Park",
      avatar: "/assets/static/Travellers Review/8.png",
      location: "New York",
      rating: 3,
      createdAt: "22 July 2023",
      summary:
        "As I already said we really enjoyed the trip what so ever and I reckon that the best moments were when we visited. Exceeded all expectations! Flawless arrangements, knowledgeable guides, and unforgettable experiences. Highly recommend!",
    },
  ];

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
      <Container>
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
          <div ref={sliderRef} className="keen-slider">
            {reviews.map((review, index) => (
              <article
                key={index}
                className="group relative flex flex-col gap-y-4 border hover:border-primary transition-colors ease-linear p-4 rounded keen-slider__slide"
              >
                <div className="flex flex-row gap-x-2.5 items-end">
                  <LoadImage
                    src={review.avatar}
                    alt={review.name}
                    width={50}
                    height={50}
                    className="rounded h-[50px] w-[50px] object-cover"
                  />
                  <div className="flex flex-row justify-between w-full">
                    <div className="">
                      <h2 className="">{review.name}</h2>
                      <p className="text-xs">Traveler, {review.location}</p>
                    </div>
                    <div className="flex flex-col items-end">
                      <p className="text-sm flex flex-row items-center">
                        <AiFillStar className="text-[#F9BC1D]" /> •{" "}
                        {review.rating}
                      </p>
                      <p className="text-xs">{review.createdAt}</p>
                    </div>
                  </div>
                </div>
                <p className="text-sm">
                  <RiChatQuoteFill className="absolute top-2 left-2 w-6 h-6 text-primary z-10 opacity-0 group-hover:opacity-100 transition-opacity ease-linear delay-100 line-clamp-6" />
                  {review.summary}
                </p>
              </article>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Reviews;
