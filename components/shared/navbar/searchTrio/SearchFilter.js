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
import { toast } from "react-hot-toast";

const SearchFilter = ({ setIsModalOpen }) => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const { data, isLoading, error } = useGetRentsQuery();
  const tours = useMemo(() => data?.data || [], [data]);

  useEffect(() => {
    if (isLoading) {
      toast.loading("Loading...", { id: "search" });
    }

    if (data) {
      toast.success(data?.message, { id: "search" });
    }

    if (error?.data) {
      toast.error(error?.data?.message, { id: "search" });
    }
  }, [data, error, isLoading]);

  const handleSearch = (event) => {
    setSearchTerm(event?.target?.value?.toLowerCase());
  };

  const filteredTravels =
    searchTerm?.length > 0
      ? tours.filter(({ title, summary, location }) => {
          const lowerTitle = title?.toLowerCase();
          const lowerDescription = summary?.toLowerCase();
          const lowerCountry = location?.toLowerCase();

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
      <>
        {" "}
        <input
          type="search"
          name="search"
          id="search"
          className="w-full rounded border-1 border-primary text-sm"
          placeholder="Enter your destination here..."
          onChange={handleSearch}
          autoComplete="off"
        />
        <div className="flex flex-col gap-y-2.5 h-full overflow-y-auto">
          {filteredTravels.length === 0 ? (
            <p className="text-sm text-red-500">No rents found!</p>
          ) : (
            filteredTravels.map(({ _id, title, summary, location, price }) => {
              const highlightedTitle = highlightMatch(title, searchTerm);
              const highlightedDescription = highlightMatch(
                summary,
                searchTerm
              );
              const highlightedCountry = highlightMatch(location, searchTerm);

              return (
                <article
                  key={_id}
                  className="flex flex-col gap-y-0.5 cursor-pointer bg-slate-50 p-2.5 rounded"
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
                    className="!font-normal text-base line-clamp-1"
                    dangerouslySetInnerHTML={{ __html: highlightedTitle }}
                  />
                  <p
                    className="line-clamp-2 text-sm"
                    dangerouslySetInnerHTML={{ __html: highlightedDescription }}
                  />
                  <p className="flex flex-row gap-x-2 mt-1">
                    <span className="text-xs border border-cyan-900 px-2 rounded">
                      ${price}/night
                    </span>
                    <span
                      className="text-end text-xs text-gray-500 line-clamp-1 border border-teal-900 px-2 rounded"
                      dangerouslySetInnerHTML={{ __html: highlightedCountry }}
                    />
                  </p>
                </article>
              );
            })
          )}
        </div>
      </>
  );
};

export default SearchFilter;
