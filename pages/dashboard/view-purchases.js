/**
 * Title: Write a program using JavaScript on View-purchases
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
import Panel from "@/layouts/Panel";
import {
  useGetPurchasesQuery,
  useModifyPurchaseStatusMutation,
  useRemoveFromPurchaseMutation,
} from "@/services/payment/paymentApi";
import React, { useEffect, useMemo } from "react";
import { toast } from "react-hot-toast";
import { BsFillCartXFill } from "react-icons/bs";
import { useSelector } from "react-redux";

const ViewPurchases = () => {
  const user = useSelector((state) => state?.auth);

  return (
    <Panel>
      {user?.role === "user" && <UserRows purchases={user?.purchases} />}
      {user?.role === "admin" && <AdminRows />}
    </Panel>
  );
};

const UserRows = ({ purchases }) => {
  const user = useSelector((state) => state?.auth);
  const [
    modifyPurchaseStatus,
    {
      isLoading: modifyPurchaseStatusLoading,
      data: modifyPurchaseStatusData,
      error: modifyPurchaseStatusError,
    },
  ] = useModifyPurchaseStatusMutation();

  useEffect(() => {
    if (modifyPurchaseStatusLoading) {
      toast.loading("Modifying purchase status...", {
        id: "modify-purchase-status",
      });
    }

    if (modifyPurchaseStatusData) {
      toast.success(modifyPurchaseStatusData?.message, {
        id: "modify-purchase-status",
      });
    }

    if (modifyPurchaseStatusError?.data) {
      toast.error(modifyPurchaseStatusError?.data?.message, {
        id: "modify-purchase-status",
      });
    }
  }, [
    modifyPurchaseStatusLoading,
    modifyPurchaseStatusData,
    modifyPurchaseStatusError,
  ]);

  return (
    <>
      {purchases?.length === 0 ? (
        <p className="h-full w-full flex justify-center items-center">
          You still now purchase any rent!
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
                  Status
                </th>
                <th scope="col" className="px-6 py-3">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {purchases?.map(
                ({ rent, status, price, members, duration, _id }) => (
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
                      <span className="text-sm">{price}</span>
                    </td>
                    <td
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                    >
                      <span className="text-sm">{members}</span>
                    </td>
                    <td
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                    >
                      <span className="text-sm">
                        {new Date(duration?.startDate).toLocaleDateString(
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
                        {new Date(duration?.endDate).toLocaleDateString(
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
                      {user?._id === rent?.owner?._id ? (
                        <select
                          defaultValue={status}
                          name="status"
                          id="status"
                          className="text-xs"
                          onChange={(e) =>
                            modifyPurchaseStatus({
                              id: _id,
                              body: { status: e.target.value },
                            })
                          }
                        >
                          <option value="pending">Pending</option>
                          <option value="success">Success</option>
                        </select>
                      ) : (
                        status
                      )}
                    </td>
                    <td
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                    >
                      {user?._id === rent?.owner?._id ||
                      user?.role === "admin" ? (
                        <RemoveFromPurchases purchaseId={_id} />
                      ) : (
                        <span
                          className="border border-cyan-900 text-cyan-900 bg-cyan-100/50 px-2 py-0 rounded uppercase"
                          style={{ fontSize: "8px" }}
                        >
                          admin
                        </span>
                      )}
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </section>
      )}
    </>
  );
};

function AdminRows() {
  const {
    isLoading: purchasesLoading,
    data: purchasesData,
    error: purchasesError,
  } = useGetPurchasesQuery();
  const purchases = useMemo(() => purchasesData?.data || [], [purchasesData]);

  const [
    modifyPurchaseStatus,
    {
      isLoading: modifyPurchaseStatusLoading,
      data: modifyPurchaseStatusData,
      error: modifyPurchaseStatusError,
    },
  ] = useModifyPurchaseStatusMutation();

  useEffect(() => {
    if (purchasesLoading) {
      toast.loading("Fetching purchases...", {
        id: "fetch-purchases",
      });
    }

    if (purchasesData) {
      toast.success(purchasesData?.message, {
        id: "fetch-purchases",
      });
    }

    if (purchasesError?.data) {
      toast.error(purchasesError?.data?.message, {
        id: "fetch-purchases",
      });
    }

    if (modifyPurchaseStatusLoading) {
      toast.loading("Modifying purchase status...", {
        id: "modify-purchase-status",
      });
    }

    if (modifyPurchaseStatusData) {
      toast.success(modifyPurchaseStatusData?.message, {
        id: "modify-purchase-status",
      });
    }

    if (modifyPurchaseStatusError?.data) {
      toast.error(modifyPurchaseStatusError?.data?.message, {
        id: "modify-purchase-status",
      });
    }
  }, [
    purchasesLoading,
    purchasesData,
    purchasesError,
    modifyPurchaseStatusLoading,
    modifyPurchaseStatusData,
    modifyPurchaseStatusError,
  ]);

  return (
    <>
      {!purchasesLoading && purchases?.length === 0 && (
        <p className="h-full w-full flex justify-center items-center">
          No-one purchase any item!
        </p>
      )}

      {purchasesLoading ? (
        <>
          {[1, 2, 3].map((i) => (
            <Table key={i} repeat={15} />
          ))}
        </>
      ) : (
        !(purchases?.length === 0) && (
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
                    Email
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
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {purchases?.map(
                  ({ rent, status, price, members, duration, _id, user }) => (
                    <tr
                      key={rent?._id}
                      className="bg-white hover:bg-secondary/50 transition-colors"
                    >
                      <td
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                      >
                        <LoadImage
                          src={user?.avatar?.url}
                          alt={user?.avatar?.public_id}
                          height={30}
                          width={30}
                          className="h-[30px] w-[30px] rounded-secondary border border-primary object-cover"
                        />
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
                        <span className="text-sm">{user?.email}</span>
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
                        <span className="text-sm">{price}</span>
                      </td>
                      <td
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                      >
                        <span className="text-sm">{members}</span>
                      </td>
                      <td
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                      >
                        <span className="text-sm">
                          {new Date(duration?.startDate).toLocaleDateString(
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
                          {new Date(duration?.endDate).toLocaleDateString(
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
                        <select
                          defaultValue={status}
                          name="status"
                          id="status"
                          className="text-xs"
                          onChange={(e) =>
                            modifyPurchaseStatus({
                              id: _id,
                              body: { status: e.target.value },
                            })
                          }
                        >
                          <option value="pending">Pending</option>
                          <option value="success">Success</option>
                        </select>
                      </td>
                      <td
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                      >
                        <RemoveFromPurchases purchaseId={_id} />
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </section>
        )
      )}
    </>
  );
}

function RemoveFromPurchases({ purchaseId }) {
  const [
    removeFromPurchases,
    {
      isLoading: removeFromPurchasesLoading,
      data: removeFromPurchasesData,
      error: removeFromPurchasesError,
    },
  ] = useRemoveFromPurchaseMutation();

  useEffect(() => {
    if (removeFromPurchasesLoading) {
      toast.loading("Removing from purchases...", {
        id: "remove-from-purchases",
      });
    }

    if (removeFromPurchasesData) {
      toast.success(removeFromPurchasesData?.message, {
        id: "remove-from-purchases",
      });
    }

    if (removeFromPurchasesError?.data) {
      toast.error(removeFromPurchasesError?.data?.message, {
        id: "remove-from-purchases",
      });
    }
  }, [
    removeFromPurchasesLoading,
    removeFromPurchasesData,
    removeFromPurchasesError,
  ]);

  return (
    <button
      type="button"
      className="p-1.5 rounded-secondary bg-red-500 !text-white"
      onClick={() => removeFromPurchases(purchaseId)}
    >
      <BsFillCartXFill className="w-4 h-4" />
    </button>
  );
}

export default ViewPurchases;
