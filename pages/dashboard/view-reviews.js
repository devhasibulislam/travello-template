/**
 * Title: Write a program using JavaScript on View-reviews
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
 * Date: 01, February 2024
 */

import LoadImage from "@/components/shared/image/LoadImage";
import Panel from "@/layouts/Panel";
import {
  useDeleteReviewMutation,
  useGetAllReviewsQuery,
} from "@/services/review/reviewApi";
import React, { useEffect, useMemo } from "react";
import { toast } from "react-hot-toast";
import { AiFillStar } from "react-icons/ai";
import { FiTrash } from "react-icons/fi";
import { useSelector } from "react-redux";

const ViewReviews = () => {
  const user = useSelector((state) => state?.auth);

  return (
    <Panel>
      {user?.role === "user" && <UserRows reviews={user?.reviews} />}
      {user?.role === "admin" && <AdminRows />}
    </Panel>
  );
};

const UserRows = ({ reviews }) => {
  const [deleteReview, { isLoading, data, error }] = useDeleteReviewMutation();

  useEffect(() => {
    if (data) {
      toast.success(data?.message, { id: "delete-review" });
    }

    if (error?.data) {
      toast.error(error?.data?.message, { id: "delete-review" });
    }

    if (isLoading) {
      toast.loading("Deleting review...", { id: "delete-review" });
    }
  }, [data, error, isLoading]);

  return (
    <>
      {reviews?.length === 0 ? (
        <p className="h-full w-full flex justify-center items-center">
          No review added yet!
        </p>
      ) : (
        <section className="lg:w-3/4 md:w-4/5 w-full flex flex-col gap-y-4">
          {reviews?.map(
            ({ reviewer, rent, _id, comment, rating, createdAt }) => (
              <div
                key={_id}
                className="bg-slate-50 p-4 rounded flex flex-col gap-y-2 relative group"
              >
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
                  <h1 className="text-xl">{rent?.title}</h1>
                </div>
                <div className="flex flex-col gap-y-2">
                  <p className="text-sm">{comment}</p>
                  <div className="text-xs flex flex-row gap-x-2 items-start">
                    <LoadImage
                      src={reviewer?.avatar?.url}
                      alt={reviewer?.avatar?.public_id}
                      height={30}
                      width={30}
                      className="h-[30px] w-[30px] rounded-secondary border border-primary object-cover"
                    />
                    <p className="flex flex-col gap-y-0.5">
                      <span className="">{reviewer?.name}</span>
                      <span className="">
                        {(() => {
                          const date = new Date(createdAt);
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
                      </span>
                      <span className="text-xs flex items-center gap-x-0.5">
                        {Array.from(
                          { length: rating },
                          (_, index) => index + 1
                        ).map((_, index) => (
                          <AiFillStar
                            key={index}
                            className="w-4 h-4 text-yellow-500"
                          />
                        ))}
                      </span>
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  className="p-1.5 rounded-secondary bg-red-500 !text-white absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 z-50"
                  onClick={() => deleteReview(_id)}
                >
                  <FiTrash className="w-5 h-5" />
                </button>
              </div>
            )
          )}
        </section>
      )}
    </>
  );
};

const AdminRows = () => {
  const {
    isLoading: fetchingReviewsLoading,
    data: fetchReviewsData,
    error: fetchReviewsError,
  } = useGetAllReviewsQuery();
  const reviews = useMemo(
    () => fetchReviewsData?.data || [],
    [fetchReviewsData]
  );

  const [
    deleteReview,
    {
      isLoading: deleteReviewLoading,
      data: deleteReviewData,
      error: deleteReviewError,
    },
  ] = useDeleteReviewMutation();

  useEffect(() => {
    if (deleteReviewData) {
      toast.success(deleteReviewData?.message, { id: "delete-review" });
    }

    if (deleteReviewError?.data) {
      toast.error(deleteReviewError?.data?.message, { id: "delete-review" });
    }

    if (deleteReviewLoading) {
      toast.loading("Deleting review...", { id: "delete-review" });
    }

    if (fetchingReviewsLoading) {
      toast.loading("Fetching reviews...", { id: "fetch-reviews" });
    }

    if (fetchReviewsData) {
      toast.success(fetchReviewsData?.message, { id: "fetch-reviews" });
    }

    if (fetchReviewsError?.data) {
      toast.error(fetchReviewsError?.data?.message, { id: "fetch-reviews" });
    }
  }, [
    deleteReviewData,
    deleteReviewError,
    deleteReviewLoading,
    fetchReviewsData,
    fetchReviewsError,
    fetchingReviewsLoading,
  ]);

  return (
    <>
      {reviews?.length === 0 ? (
        <p className="h-full w-full flex justify-center items-center">
          No review added yet!
        </p>
      ) : (
        <section className="lg:w-3/4 md:w-4/5 w-full flex flex-col gap-y-4">
          {reviews?.map(
            ({ reviewer, rent, _id, comment, rating, createdAt }) => (
              <div
                key={_id}
                className="bg-slate-50 p-4 rounded flex flex-col gap-y-2 relative group"
              >
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
                  <h1 className="text-xl">{rent?.title}</h1>
                </div>
                <div className="flex flex-col gap-y-2">
                  <p className="text-sm">{comment}</p>
                  <div className="text-xs flex flex-row gap-x-2 items-start">
                    <LoadImage
                      src={reviewer?.avatar?.url}
                      alt={reviewer?.avatar?.public_id}
                      height={30}
                      width={30}
                      className="h-[30px] w-[30px] rounded-secondary border border-primary object-cover"
                    />
                    <p className="flex flex-col gap-y-0.5">
                      <span className="">{reviewer?.name}</span>
                      <span className="">
                        {(() => {
                          const date = new Date(createdAt);
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
                      </span>
                      <span className="text-xs flex items-center gap-x-0.5">
                        {Array.from(
                          { length: rating },
                          (_, index) => index + 1
                        ).map((_, index) => (
                          <AiFillStar
                            key={index}
                            className="w-4 h-4 text-yellow-500"
                          />
                        ))}
                      </span>
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  className="p-1.5 rounded-secondary bg-red-500 !text-white absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 z-50"
                  onClick={() => deleteReview(_id)}
                >
                  <FiTrash className="w-5 h-5" />
                </button>
              </div>
            )
          )}
        </section>
      )}
    </>
  );
};

export default ViewReviews;
