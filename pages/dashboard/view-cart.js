/**
 * Title: Write a program using JavaScript on View-cart
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
import Table from "@/components/shared/loading/Table";
import Modal from "@/components/shared/modal/Modal";
import Panel from "@/layouts/Panel";
import {
  useGetCartQuery,
  useRemoveFromCartMutation,
} from "@/services/cart/cartApi";
import React, { useEffect, useMemo } from "react";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { BsFillCartXFill } from "react-icons/bs";
import { TbEyeShare } from "react-icons/tb";
import { useSelector } from "react-redux";

const ViewCart = () => {
  const user = useSelector((state) => state?.auth);

  return (
    <Panel>
      {user?.role === "user" && <UserRows cart={user?.cart} />}
      {user?.role === "admin" && <AdminRows />}
    </Panel>
  );
};

function UserRows({ cart }) {
  return (
    <>
      {cart?.rents?.length === 0 ? (
        <p className="h-full w-full flex justify-center items-center">
          Your cart is empty!
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
              {cart?.rents?.map((rent) => (
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
                    <span className="text-sm capitalize">{rent?.type}</span>
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
                    <span className={"text-sm"}>{rent?.users?.length}</span>
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
                    <RemoveFromCart rentId={rent?._id} />
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
  const { isLoading, data, error } = useGetCartQuery();
  const cart = useMemo(() => data?.data || [], [data]);

  useEffect(() => {
    if (isLoading) {
      toast.loading("Fetching cart...", { id: "fetch-cart" });
    }

    if (error) {
      toast.error(error?.data?.message, { id: "fetch-cart" });
    }

    if (data) {
      toast.success(data?.message, { id: "fetch-cart" });
    }
  }, [isLoading, data, error]);

  return (
    <>
      {!isLoading && cart?.length === 0 && (
        <p className="h-full w-full flex justify-center items-center">
          No-one add any item to favorite list!
        </p>
      )}

      {isLoading ? (
        <>
          {[1, 2, 3].map((i) => (
            <Table key={i} repeat={15} />
          ))}
        </>
      ) : (
        <section className="h-full w-full">
          <table className="w-full text-sm text-left text-gray-500 z-10">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Avatar
                </th>
                <th scope="col" className="px-6 py-3">
                  Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Role
                </th>
                <th scope="col" className="px-6 py-3">
                  Status
                </th>
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
              {cart?.map(({ user, rents, _id }) =>
                rents?.map((rent) => (
                  <tr
                    key={_id}
                    className="bg-white hover:bg-secondary/50 transition-colors"
                  >
                    <td
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                    >
                      <span className="flex -space-x-4">
                        <LoadImage
                          src={user?.avatar?.url}
                          alt={user?.avatar?.public_id}
                          height={30}
                          width={30}
                          className="h-[30px] w-[30px] rounded-secondary border border-primary object-cover"
                        />
                      </span>
                    </td>
                    <td
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                    >
                      <span className="text-sm">{user?.name}</span>
                    </td>
                    <td
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                    >
                      <span className="text-sm">{user?.role}</span>
                    </td>
                    <td
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                    >
                      <span className="text-sm">{user?.status}</span>
                    </td>
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
                      <span className="text-sm capitalize">{rent?.type}</span>
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
                      <span className={"text-sm"}>{rent?.users?.length}</span>
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
                      <RemoveFromCart rentId={rent?._id} />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </section>
      )}
    </>
  );
}

function RemoveFromCart({ rentId }) {
  const [
    removeFromCart,
    {
      isLoading: removeFromCartLoading,
      data: removeFromCartData,
      error: removeFromCartError,
    },
  ] = useRemoveFromCartMutation();

  useEffect(() => {
    if (removeFromCartLoading) {
      toast.loading("Removing from cart...", { id: "remove-from-cart" });
    }

    if (removeFromCartData) {
      toast.success(removeFromCartData?.message, {
        id: "remove-from-cart",
      });
    }

    if (removeFromCartError?.data) {
      toast.error(removeFromCartError?.data?.message, {
        id: "remove-from-cart",
      });
    }
  }, [removeFromCartLoading, removeFromCartData, removeFromCartError]);

  return (
    <button
      type="button"
      className="p-1.5 rounded-secondary bg-red-500 !text-white"
      onClick={() => removeFromCart(rentId)}
    >
      <BsFillCartXFill className="w-4 h-4" />
    </button>
  );
}

export default ViewCart;
