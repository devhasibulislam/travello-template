/**
 * Title: Write a program using JavaScript on List-sellers
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

import Panel from "@/layouts/Panel";
import { useGetUsersQuery } from "@/services/user/userApi";
import React, { useEffect, useMemo } from "react";
import { toast } from "react-hot-toast";

const ListSellers = () => {
  const { isLoading, data, error } = useGetUsersQuery();
  const users = useMemo(() => data?.data || [], [data]);
  const sellers = users.filter((user) => user?.rents?.length > 0);

  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message, {
        id: "sellers",
      });
    }

    if (isLoading) {
      toast.loading("Fetching sellers...", {
        id: "sellers",
      });
    }

    if (data) {
      toast.success(data?.message, {
        id: "sellers",
      });
    }
  }, [isLoading, data, error]);

  return (
    <Panel>
      Show users who sell rents and for admin display all in details
    </Panel>
  );
};

export default ListSellers;
