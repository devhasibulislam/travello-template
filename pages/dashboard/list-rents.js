/**
 * Title: Write a program using JavaScript on List Rents
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
 * Date: 16, November 2023
 */

import LoadImage from "@/components/shared/image/LoadImage";
import Table from "@/components/shared/loading/Table";
import Link from "next/link";
import React, { useEffect, useMemo } from "react";
import { FiEdit3 } from "react-icons/fi";
import { useGetRentsQuery } from "@/services/rent/rentApi";
import DeleteRent from "@/components/dashboard/DeleteRent";
import { useDispatch, useSelector } from "react-redux";
import { setRent } from "@/features/rent/rentSlice";
import Panel from "@/layouts/Panel";
import { toast } from "react-hot-toast";

const ListRents = () => {
  const user = useSelector((state) => state?.auth);

  return (
    <Panel>
      {user?.role === "user" && <UserRows rents={user?.rents} />}
      {user?.role === "admin" && <AdminRows />}
    </Panel>
  );
};

function UserRows({ rents }) {
  const dispatch = useDispatch();

  return (
    <>
      {rents?.length === 0 ? (
        <p className="h-full w-full flex justify-center items-center">
          Your rent list is empty!
        </p>
      ) : (
        <section className="h-full w-full">
          <table className="w-full text-sm text-left text-gray-500 z-10">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Gallery
                </th>
                <th scope="col" className="px-6 py-3">
                  Title
                </th>
                <th scope="col" className="px-6 py-3">
                  <span className="text-xs whitespace-nowrap">Price ($)</span>
                </th>
                <th scope="col" className="px-6 py-3">
                  Members
                </th>
                <th scope="col" className="px-6 py-3">
                  <span className="text-xs whitespace-nowrap">Start Date</span>
                </th>
                <th scope="col" className="px-6 py-3">
                  <span className="text-xs whitespace-nowrap">End Date</span>
                </th>
                <th scope="col" className="px-6 py-3">
                  Type
                </th>
                <th scope="col" className="px-6 py-3">
                  Purchases
                </th>
                <th scope="col" className="px-6 py-3">
                  Reviews
                </th>
                <th scope="col" className="px-6 py-3">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {rents.map((rent) => (
                <tr
                  key={rent?._id}
                  className="bg-white hover:bg-secondary/50 transition-colors"
                >
                  <td
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                  >
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
                  </td>
                  <td
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                  >
                    <span className="text-sm block w-56 truncate">
                      {rent?.title}
                    </span>
                  </td>
                  <td
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                  >
                    <span className="text-sm">{rent?.price}</span>
                  </td>
                  <td
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                  >
                    <span className="text-sm">{rent?.members}</span>
                  </td>
                  <td
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                  >
                    <span className="text-sm">
                      {new Date(rent?.duration?.startDate).toLocaleDateString(
                        "en-US",
                        {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        }
                      )}
                    </span>
                  </td>
                  <td
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                  >
                    <span className="text-sm">
                      {new Date(rent?.duration?.endDate).toLocaleDateString(
                        "en-US",
                        { year: "numeric", month: "short", day: "numeric" }
                      )}
                    </span>
                  </td>
                  <td
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                  >
                    <span className="text-sm capitalize">{rent?.type}</span>
                  </td>
                  <td
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                  >
                    <span className="text-sm">{rent?.users?.length}</span>
                  </td>
                  <td
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                  >
                    <span className={"text-sm"}>{rent?.reviews?.length}</span>
                  </td>
                  <td
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                  >
                    <span className="flex flex-row items-center gap-x-2">
                      <Link
                        href={"/dashboard/update-rent/?id=" + rent?._id}
                        onClick={() => dispatch(setRent(rent))}
                        className="p-1 rounded-secondary bg-primary !text-white"
                      >
                        <FiEdit3 className="w-5 h-5" />
                      </Link>
                      <div className="h-6 w-[1px] border-l" />
                      <DeleteRent id={rent?._id} />
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      )}
    </>
  );
}

function AdminRows() {
  const { data, isLoading, error } = useGetRentsQuery();
  const rents = useMemo(() => data?.data || [], [data]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isLoading) {
      toast.loading("Fetching rents...", { id: "fetch-rents" });
    }

    if (data) {
      toast.success(data?.message, { id: "fetch-rents" });
    }

    if (error?.data) {
      toast.error(error?.data?.message, { id: "fetch-rents" });
    }
  }, [error, data, isLoading]);

  return (
    <>
      {!isLoading && rents?.length === 0 && (
        <p className="h-full w-full flex justify-center items-center">
          No rents created to display!
        </p>
      )}

      {isLoading ? (
        <>
          {[1, 2, 3].map((i) => (
            <Table key={i} repeat={15} />
          ))}
        </>
      ) : (
        !(rents?.length === 0) && (
          <section className="h-full w-full">
            <table className="w-full text-sm text-left text-gray-500 z-10">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Gallery
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Title
                  </th>
                  <th scope="col" className="px-6 py-3">
                    <span className="text-xs whitespace-nowrap">Price ($)</span>
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Members
                  </th>
                  <th scope="col" className="px-6 py-3">
                    <span className="text-xs whitespace-nowrap">
                      Start Date
                    </span>
                  </th>
                  <th scope="col" className="px-6 py-3">
                    <span className="text-xs whitespace-nowrap">End Date</span>
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Type
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Owner
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Purchases
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Reviews
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {isLoading
                  ? [1, 2, 3].map((i) => <Table key={i} repeat={10} />)
                  : rents.map((rent) => (
                      <tr
                        key={rent?._id}
                        className="bg-white hover:bg-secondary/50 transition-colors"
                      >
                        <td
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                        >
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
                        </td>
                        <td
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                        >
                          <span className="text-sm block w-56 truncate">
                            {rent?.title}
                          </span>
                        </td>
                        <td
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                        >
                          <span className="text-sm">{rent?.price}</span>
                        </td>
                        <td
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                        >
                          <span className="text-sm">{rent?.members}</span>
                        </td>
                        <td
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                        >
                          <span className="text-sm">
                            {new Date(
                              rent?.duration?.startDate
                            ).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            })}
                          </span>
                        </td>
                        <td
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                        >
                          <span className="text-sm">
                            {new Date(
                              rent?.duration?.endDate
                            ).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            })}
                          </span>
                        </td>
                        <td
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                        >
                          <span className="text-sm capitalize">
                            {rent?.type}
                          </span>
                        </td>
                        <td
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                        >
                          <span className="text-sm">{rent?.owner?.name}</span>
                        </td>
                        <td
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                        >
                          <span className={"text-sm"}>
                            {rent?.users?.length}
                          </span>
                        </td>
                        <td
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                        >
                          <span className={"text-sm"}>
                            {rent?.reviews?.length}
                          </span>
                        </td>
                        <td
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                        >
                          <span className="flex flex-row items-center gap-x-2">
                            <Link
                              href={"/dashboard/update-rent/?id=" + rent?._id}
                              onClick={() => dispatch(setRent(rent))}
                              className="p-1 rounded-secondary bg-primary !text-white"
                            >
                              <FiEdit3 className="w-5 h-5" />
                            </Link>
                            <div className="h-6 w-[1px] border-l" />
                            <DeleteRent id={rent?._id} />
                          </span>
                        </td>
                      </tr>
                    ))}
              </tbody>
            </table>
          </section>
        )
      )}
    </>
  );
}

export default ListRents;
