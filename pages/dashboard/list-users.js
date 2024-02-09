/**
 * Title: Write a program using JavaScript on List Users
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
import { useGetUsersQuery } from "@/services/user/userApi";
import React, { useEffect, useState } from "react";
import { FiEdit3 } from "react-icons/fi";
import Modal from "@/components/shared/modal/Modal";
import UpdateUser from "@/components/dashboard/UpdateUser";
import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import Panel from "@/layouts/Panel";
import { setUser } from "@/features/user/userSlice";
import DeleteUser from "@/components/dashboard/DeleteUser";

const ListUsers = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { data, isLoading, error } = useGetUsersQuery();
  const usr = useSelector((state) => state?.auth);
  const users = useMemo(() => data?.data || [], [data]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (error?.data) {
      alert(error?.data?.message);
    }
  }, [error]);

  return (
    <>
      <Panel>
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
                  Phone
                </th>
                <th scope="col" className="px-6 py-3">
                  Hotels
                </th>
                <th scope="col" className="px-6 py-3">
                  Role
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
              {users?.length === 0 || isLoading ? (
                <>
                  {[1, 2, 3].map((i) => (
                    <Table key={i} repeat={8} />
                  ))}
                </>
              ) : (
                users?.map((user) => (
                  <>
                    <tr className="bg-white hover:bg-secondary/50 transition-colors">
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
                        <span className="text-sm">{user?.phone}</span>
                      </td>
                      <td
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                      >
                        <span className="text-sm">{user?.rents?.length}</span>
                      </td>
                      <td
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                      >
                        <span className="text-sm capitalize">{user?.role}</span>
                      </td>
                      <td
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                      >
                        <span
                          className={
                            "text-sm" +
                            " " +
                            (user?.status === "active"
                              ? "text-green-500"
                              : "text-red-500")
                          }
                        >
                          {user?.status}
                        </span>
                      </td>
                      <td
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                      >
                        {usr?.role === "admin" ? (
                          <span className="flex flex-row items-center gap-x-2">
                            <button
                              type="button"
                              className="p-1 rounded-secondary bg-primary !text-white"
                              onClick={() => {
                                setIsOpen(true);
                                dispatch(setUser(user));
                              }}
                            >
                              <FiEdit3 className="w-5 h-5" />
                            </button>
                            <div className="h-6 w-[1px] border-l" />
                            <DeleteUser id={user?._id} />
                          </span>
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
                  </>
                ))
              )}
            </tbody>
          </table>
        </section>
      </Panel>

      {isOpen && (
        <Modal
          isOpen={isOpen}
          onClose={() => {
            setIsOpen(false);
            dispatch(setUser({}));
          }}
          className="lg:w-3/12 md:w-1/2 w-full z-50"
        >
          <UpdateUser setIsOpen={setIsOpen} />
        </Modal>
      )}
    </>
  );
};

export default ListUsers;
