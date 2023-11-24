/**
 * Title: Write a program using JavaScript on UserPersist
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
 * Date: 17, November 2023
 */

import { setUser } from "@/features/user/userSlice";
import { useGetUserQuery } from "@/services/auth/authApi";
import React from "react";
import { useMemo } from "react";
import { useDispatch } from "react-redux";
import Screen from "../loading/Screen";
import { useEffect } from "react";

const UserPersist = ({ children }) => {
  const { data, isLoading, error } = useGetUserQuery();
  const user = useMemo(() => data?.data || {}, [data]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (Object?.keys(user).length > 0) {
      dispatch(setUser(user));
    }
    if (error) {
      console.log(error?.data?.message);
    }
  }, [error, user, dispatch]);

  if (isLoading) {
    return <Screen />;
  }

  return <>{children}</>;
};

export default UserPersist;
