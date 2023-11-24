/**
 * Title: Write a program using JavaScript on FilteredTours
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
 * Date: 02, November 2023
 */

import React, { useEffect, useMemo } from "react";
import Card from "../shared/card/Card";
import SkeletonCard from "../shared/card/SkeletonCard";
import { useGetFilteredRentsMutation } from "@/services/rent/rentApi";
import { useSelector } from "react-redux";

const FilteredTours = () => {
  const rentFilter = useSelector((state) => state.rentFilter);
  const [addFilter, { data, isLoading, error }] = useGetFilteredRentsMutation();
  const tours = useMemo(() => data?.data || [], [data]);

  useEffect(() => {
    if (error) {
      alert(error.message);
    }
  }, [error]);

  useEffect(() => {
    addFilter({ body: { ...rentFilter } || {} });
  }, [addFilter, rentFilter]);

  return (
    <section className="lg:col-span-9 md:col-span-8 col-span-12 flex flex-col gap-y-4">
      <div className="w-full grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">
        {isLoading
          ? Array.from({ length: 9 }, (_, index) => (
              <SkeletonCard key={index} />
            ))
          : tours.map((tour) => <Card key={tour._id} tour={tour} />)}
        {tours?.length === 0 && (
          <span>
            No tours found for this filter :( <br /> Reset filter!
          </span>
        )}
      </div>
    </section>
  );
};

export default FilteredTours;
