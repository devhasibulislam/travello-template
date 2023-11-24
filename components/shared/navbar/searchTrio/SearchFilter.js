/**
 * Title: Write a program using JavaScript on SearchFilter
 * Author: Hasibul Islam
 * Portfolio: https://devhasibulislam.vercel.app
 * Linkedin: https://linkedin.com/in/devhasibulislam
 * GitHub: https://github.com/in/devhasibulislam
 * Facebook: https://facebook.com/in/devhasibulislam
 * Instagram: https://instagram.com/in/devhasibulislam
 * Twitter: https://twitter.com/in/devhasibulislam
 * Pinterest: https://pinterest.com/in/devhasibulislam
 * WhatsApp: https://wa.me/8801906315901
 * Telegram: devhasibulislam
 * Date: 15, August 2023
 */

import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import { useGetRentsQuery } from "@/services/rent/rentApi";

const SearchFilter = ({ setIsModalOpen }) => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const { data, isLoading, error } = useGetRentsQuery();
  const tours = useMemo(() => data?.data || [], [data]);

  useEffect(() => {
    if (error) {
      console.log(error?.data?.message);
    }
  }, [error]);

  const handleSearch = (event) => {
    setSearchTerm(event?.target?.value?.toLowerCase());
  };

  const filteredTravels = searchTerm?.length
    ? tours.filter(({ title, description, country }) => {
        const lowerTitle = title?.toLowerCase();
        const lowerDescription = description?.toLowerCase();
        const lowerCountry = country?.toLowerCase();

        return (
          lowerTitle?.includes(searchTerm) ||
          lowerDescription?.includes(searchTerm) ||
          lowerCountry?.includes(searchTerm)
        );
      })
    : tours;

  const highlightMatch = (text, keyword) => {
    if (!keyword) {
      return text;
    }

    const escapedKeyword = keyword.replace(/[.*+?^${}()|[\]\\]/gi, "\\$&");
    const regex = new RegExp(escapedKeyword, "gi");

    let match;
    let result = text;

    while ((match = regex.exec(text)) !== null) {
      const startPos = match.index;
      const endPos = regex.lastIndex;
      const highlighted = `<mark>${text.substring(startPos, endPos)}</mark>`;
      result =
        result.substring(0, startPos) + highlighted + result.substring(endPos);
    }

    return result;
  };

  return (
    <section>
      <div className="flex flex-col gap-y-6">
        <input
          type="search"
          name="search"
          id="search"
          className="w-full rounded border-1 border-primary text-sm"
          placeholder="Enter your destination here..."
          onChange={handleSearch}
          autoComplete="off"
        />

        <div className="flex flex-col gap-y-2.5 max-h-96 overflow-y-auto">
          {isLoading || filteredTravels.length === 0 ? (
            <p className="text-sm text-red-500">
              No matching destinations found.
            </p>
          ) : (
            filteredTravels.map(({ _id, title, description, country }) => {
              const highlightedTitle = highlightMatch(title, searchTerm);
              const highlightedDescription = highlightMatch(
                description,
                searchTerm
              );
              const highlightedCountry = highlightMatch(country, searchTerm);

              return (
                <article
                  key={_id}
                  className="flex flex-col gap-y-0.5 cursor-pointer"
                  onClick={() => {
                    router.push(
                      `/tours/${_id}?tour_title=${title
                        .replace(/[^\w\s]|[\s]+/g, "-")
                        .replace(/-+/g, "-")
                        .toLowerCase()}`
                    );
                    setIsModalOpen(false);
                  }}
                >
                  <h2
                    className="!font-normal text-sm"
                    dangerouslySetInnerHTML={{ __html: highlightedTitle }}
                  />
                  <p
                    className="line-clamp-3 text-xs"
                    dangerouslySetInnerHTML={{ __html: highlightedDescription }}
                  />
                  <span
                    className="text-end text-[10px] text-gray-500 line-clamp-1"
                    dangerouslySetInnerHTML={{ __html: highlightedCountry }}
                  />
                </article>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
};

export default SearchFilter;
