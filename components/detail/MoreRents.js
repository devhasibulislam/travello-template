/**
 * Title: Write a program using JavaScript on MoreRents
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

import { useGetRentsQuery } from "@/services/rent/rentApi";
import { useEffect, useMemo } from "react";
import Container from "../shared/container/Container";
import HighlightText from "../shared/highlightText/HighlightText";
import LoadImage from "../shared/image/LoadImage";
import Link from "next/link";
import { BiRightArrowAlt } from "react-icons/bi";
import SkeletonCard from "../shared/card/SkeletonCard";
import Card from "../shared/card/Card";
import { useSelector } from "react-redux";

const MoreRents = ({ className }) => {
  const user = useSelector((state) => state?.rent?.owner);

  return (
    <section id="flights" className="py-12">
      <Container className={`${className}`}>
        <section className="w-full h-full flex flex-col gap-y-12">
          <article className="flex flex-col gap-y-4">
            <h1 className="lg:text-5xl md:text-4xl text-3xl whitespace-normal">
              <HighlightText>Same</HighlightText> Seller&lsquo;s
              <LoadImage
                src="/assets/home-page/destination/underline.svg"
                alt="arrow"
                height={7}
                width={275}
                className="mt-1.5"
              />
            </h1>
            <p className="text-base">
              Offer you more similar rents with less price also provide extended
              facilities, check them out right now!
            </p>
          </article>

          {user?.rents?.length === 0 ? (
            <p className="text-sm text-red-500">No rents found!</p>
          ) : (
            <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-1 gap-6">
              {user?.rents?.slice(0, 8)?.map((tour) => (
                <Card key={tour._id} tour={tour} />
              ))}
            </div>
          )}
        </section>
      </Container>
    </section>
  );
};

export default MoreRents;
