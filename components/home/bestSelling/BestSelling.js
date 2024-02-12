/**
 * Title: Write a program using JavaScript on BestSelling
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
 * Date: 25, August 2023
 */

// import Image from "next/image";
import Container from "@/components/shared/container/Container";
import HighlightText from "@/components/shared/highlightText/HighlightText";
import Link from "next/link";
import React, { useEffect, useMemo } from "react";
import { BiRightArrowAlt } from "react-icons/bi";
import Card from "@/components/shared/card/Card";
import LoadImage from "@/components/shared/image/LoadImage";
import SkeletonCard from "@/components/shared/card/SkeletonCard";
import { useGetRentsQuery } from "@/services/rent/rentApi";

const BestSelling = ({ className }) => {
  const { data, isLoading, error } = useGetRentsQuery();
  const tours = useMemo(() => data?.data || [], [data]);

  useEffect(() => {
    if (error) {
      console.log(error?.data?.message);
    }
  }, [error]);

  return (
    <section id="flights" className="py-12">
      <Container className={`${className}`}>
        <section className="w-full h-full flex flex-col gap-y-12">
          <div className="flex flex-row justify-between items-center">
            <article className="flex flex-col gap-y-4">
              <h1 className="lg:text-5xl md:text-4xl text-3xl whitespace-normal">
                <HighlightText>Best</HighlightText> Selling
                <LoadImage
                  src="/assets/home-page/destination/underline.svg"
                  alt="arrow"
                  height={7}
                  width={275}
                  className="mt-1.5"
                />
              </h1>
              <p className="text-base">
                Here are some of our best selling tours across all of our
                destinations
              </p>
            </article>
            <div className="text-primary border-b-2 border-b-transparent hover:border-b-primary transition-all">
              <Link
                href="/tours"
                className="flex flex-row gap-x-1 items-center whitespace-nowrap"
              >
                See More <BiRightArrowAlt />
              </Link>
            </div>
          </div>

          <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-1 gap-6">
            {tours?.length === 0 || isLoading
              ? Array.from({ length: 4 }, (_, index) => (
                  <SkeletonCard key={index} />
                ))
              : tours
                  ?.slice(0, 8)
                  ?.map((tour) => <Card key={tour._id} tour={tour} />)}
          </div>
        </section>
      </Container>
    </section>
  );
};

export default BestSelling;
